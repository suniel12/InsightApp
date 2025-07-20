import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { testResumes } from '@/data/test-resumes';
import { testTranscriptions } from '@/data/test-transcriptions';

interface QueryResult {
  candidateId: string;
  candidateName: string;
  answer: string;
  relevanceScore: number;
  sourceType: 'resume' | 'transcript' | 'both';
  reasoning: string;
}

interface QueryResponse {
  query: string;
  results: QueryResult[];
  summary: string;
  totalCandidates: number;
  processingTime: number;
}

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();
    
    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: 'Query is required and must be a string' },
        { status: 400 }
      );
    }

    // Debug: log environment variable (remove in production)
    console.log('OpenAI API Key loaded:', process.env.OPENAI_API_KEY ? 'Yes' : 'No');
    
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error('OpenAI API key not found in environment variables');
      return NextResponse.json(
        { error: 'OpenAI API key not configured. Please check your environment variables.' },
        { status: 500 }
      );
    }

    const openai = new OpenAI({
      apiKey: apiKey,
    });

    const startTime = Date.now();
    const results: QueryResult[] = [];

    // Create knowledge bank
    const knowledgeBank = new Map<string, { resume: string; transcript: string; name: string }>();
    testResumes.forEach(resume => {
      const transcript = testTranscriptions.find(t => t.resumeId === resume.id);
      if (transcript) {
        knowledgeBank.set(resume.id, {
          resume: resume.resumeText,
          transcript: transcript.transcript,
          name: resume.candidateName
        });
      }
    });

    // Process each candidate
    for (const [candidateId, data] of knowledgeBank.entries()) {
      try {
        const context = `
CANDIDATE: ${data.name}

RESUME:
${data.resume}

CONVERSATION TRANSCRIPT:
${data.transcript}
`;

        const prompt = `Evaluate this candidate for: "${query}"

${context}

Analyze this candidate's specific qualifications and provide:
1. What relevant experience/skills this candidate has (be specific and factual)
2. A relevance score (1-10) for how well they match the query requirements
3. Source of information (resume, transcript, or both)
4. Brief reasoning for the score

IMPORTANT: Focus only on this candidate's actual experience. Do not use superlatives like "most experienced" or "best" unless their background clearly demonstrates exceptional depth.

Format as JSON:
{
  "answer": "Specific description of candidate's relevant qualifications",
  "relevanceScore": [1-10 number],
  "sourceType": "resume" | "transcript" | "both",
  "reasoning": "Brief explanation of why this score was assigned"
}`;

        const completion = await openai.chat.completions.create({
          model: "gpt-4.1-mini-2025-04-14",
          messages: [
            {
              role: "system",
              content: "You are an expert recruiter analyzing ONE candidate at a time. Always respond with valid JSON only, no markdown formatting. Be specific about this candidate's actual skills and experience. IMPORTANT: Do not claim this candidate has 'the most' or 'best' experience unless you can verify they genuinely excel compared to typical candidates. Focus on what THIS candidate specifically offers."
            },
            {
              role: "user",
              content: prompt
            }
          ],
          temperature: 0.1,
          max_tokens: 500,
          response_format: { type: "json_object" }
        });

        const responseText = completion.choices[0]?.message?.content;
        if (!responseText) {
          throw new Error('No response from OpenAI');
        }

        const parsedResponse = JSON.parse(responseText);
        
        results.push({
          candidateId,
          candidateName: data.name,
          answer: parsedResponse.answer,
          relevanceScore: parsedResponse.relevanceScore,
          sourceType: parsedResponse.sourceType,
          reasoning: parsedResponse.reasoning
        });
      } catch (error) {
        console.error(`Error processing candidate ${candidateId}:`, error);
        // Skip this candidate if processing fails
        continue;
      }
    }

    // Sort by relevance score
    const sortedResults = results.sort((a, b) => b.relevanceScore - a.relevanceScore);

    // Generate summary
    const highScoreCandidates = sortedResults.filter(r => r.relevanceScore >= 7);
    const avgScore = sortedResults.reduce((sum, r) => sum + r.relevanceScore, 0) / sortedResults.length;
    
    let summary: string;
    if (highScoreCandidates.length >= 3) {
      summary = `Found ${highScoreCandidates.length} strong candidates for "${query}". Average relevance score: ${avgScore.toFixed(1)}/10.`;
    } else if (highScoreCandidates.length >= 1) {
      summary = `Found ${highScoreCandidates.length} good match(es) for "${query}". Consider expanding search criteria for more options.`;
    } else {
      summary = `Limited matches found for "${query}". Consider refining the query or expanding requirements.`;
    }

    const response: QueryResponse = {
      query,
      results: sortedResults,
      summary,
      totalCandidates: sortedResults.length,
      processingTime: Date.now() - startTime
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}