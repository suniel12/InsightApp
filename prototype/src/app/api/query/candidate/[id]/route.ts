import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { testResumes } from '@/data/test-resumes';
import { testTranscriptions } from '@/data/test-transcriptions';

interface SingleCandidateQueryResult {
  candidateId: string;
  candidateName: string;
  answer: string;
  confidence: number;
  sourceType: 'resume' | 'transcript' | 'both';
  reasoning: string;
}

interface SingleCandidateQueryResponse {
  query: string;
  candidate: SingleCandidateQueryResult;
  processingTime: number;
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { query } = await request.json();
    
    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: 'Query is required and must be a string' },
        { status: 400 }
      );
    }

    if (!id) {
      return NextResponse.json(
        { error: 'Candidate ID is required' },
        { status: 400 }
      );
    }

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

    // Find the specific candidate
    const resume = testResumes.find(r => r.id === id);
    const transcript = testTranscriptions.find(t => t.resumeId === id);

    if (!resume || !transcript) {
      return NextResponse.json(
        { error: 'Candidate not found' },
        { status: 404 }
      );
    }

    const context = `
CANDIDATE: ${resume.candidateName}

RESUME:
${resume.resumeText}

CONVERSATION TRANSCRIPT:
${transcript.transcript}
`;

    const prompt = `Analyze this specific candidate for: "${query}"

${context}

Provide a detailed analysis of this candidate's qualifications for the given query:
1. Specific relevant experience and skills this candidate possesses
2. How well they match the query requirements (confidence level 1-10)
3. Source of information (resume, transcript, or both)
4. Detailed reasoning for your assessment

Be thorough and specific about this candidate's background. Focus on actual experience and achievements mentioned in their materials.

Format as JSON:
{
  "answer": "Detailed analysis of candidate's relevant qualifications and experience",
  "confidence": [1-10 number],
  "sourceType": "resume" | "transcript" | "both",
  "reasoning": "Thorough explanation of why this candidate matches or doesn't match the query"
}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini-2025-04-14",
      messages: [
        {
          role: "system",
          content: "You are an expert recruiter conducting an in-depth analysis of a single candidate. Always respond with valid JSON only, no markdown formatting. Provide comprehensive, specific answers based on the candidate's actual information. Focus on detailed assessment rather than comparisons."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.1,
      max_tokens: 800,
      response_format: { type: "json_object" }
    });

    const responseText = completion.choices[0]?.message?.content;
    if (!responseText) {
      throw new Error('No response from OpenAI');
    }

    const parsedResponse = JSON.parse(responseText);
    
    const result: SingleCandidateQueryResult = {
      candidateId: id,
      candidateName: resume.candidateName,
      answer: parsedResponse.answer,
      confidence: parsedResponse.confidence,
      sourceType: parsedResponse.sourceType,
      reasoning: parsedResponse.reasoning
    };

    const response: SingleCandidateQueryResponse = {
      query,
      candidate: result,
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