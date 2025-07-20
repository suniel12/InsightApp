'use client';

import { useState, useEffect } from 'react';

interface PhoneScreenQuestion {
  id: string;
  question: string;
  category: string;
  typicalAnswer: string;
  importance: 'high' | 'medium' | 'low';
}

interface TranscriptInsight {
  questionId: string;
  answer: string;
  confidence: number;
  transcriptExcerpt: string;
  additionalInsights: string[];
}

interface InterviewReadinessScore {
  overall: number;
  technical: number;
  cultural: number;
  communication: number;
  experience: number;
  redFlags: number;
}

interface PhoneScreenAnalysisProps {
  candidateId: string;
  candidateName: string;
  transcript: string;
  resume: string;
}

const PHONE_SCREEN_QUESTIONS: PhoneScreenQuestion[] = [
  {
    id: 'background',
    question: 'Tell me about your background and current role',
    category: 'Introduction',
    typicalAnswer: 'Basic role description, years of experience',
    importance: 'high'
  },
  {
    id: 'recent-projects',
    question: 'Walk me through your most recent project',
    category: 'Technical Experience',
    typicalAnswer: 'High-level project overview, technologies used',
    importance: 'high'
  },
  {
    id: 'technical-skills',
    question: 'What\'s your experience with [specific technology]?',
    category: 'Technical Skills',
    typicalAnswer: 'Years of experience, basic proficiency level',
    importance: 'high'
  },
  {
    id: 'challenges',
    question: 'Tell me about a technical challenge you faced',
    category: 'Problem Solving',
    typicalAnswer: 'Brief challenge description, high-level solution',
    importance: 'medium'
  },
  {
    id: 'why-leaving',
    question: 'Why are you looking to leave your current position?',
    category: 'Motivation',
    typicalAnswer: 'Career growth, new challenges, company fit',
    importance: 'medium'
  },
  {
    id: 'team-experience',
    question: 'Tell me about your experience working in teams',
    category: 'Collaboration',
    typicalAnswer: 'Team size, basic collaboration examples',
    importance: 'medium'
  },
  {
    id: 'questions',
    question: 'Do you have any questions about the role?',
    category: 'Engagement',
    typicalAnswer: 'Few basic questions about role or company',
    importance: 'low'
  }
];

export default function PhoneScreenAnalysis({ candidateId, candidateName, transcript, resume }: PhoneScreenAnalysisProps) {
  const [insights, setInsights] = useState<TranscriptInsight[]>([]);
  const [readinessScore, setReadinessScore] = useState<InterviewReadinessScore | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Mock analysis - in real implementation, this would call AI API
  const analyzeTranscript = async () => {
    setIsAnalyzing(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock insights based on transcript content
    const mockInsights: TranscriptInsight[] = [
      {
        questionId: 'background',
        answer: 'Senior React Developer & Tech Lead with 5+ years experience',
        confidence: 95,
        transcriptExcerpt: 'Hi, I\'m Sarah Chen, and I\'m a Senior React Developer and Tech Lead with over 5 years of experience building large-scale web applications...',
        additionalInsights: ['Leadership experience managing 4-person team', 'Specializes in e-commerce platforms', 'Experience with $24M revenue systems']
      },
      {
        questionId: 'recent-projects',
        answer: 'Complete architectural rebuild of $24M e-commerce platform',
        confidence: 98,
        transcriptExcerpt: 'Let me start with what\'s probably been the most challenging and transformative project of my career - the complete architectural rebuild of TechFlow Solutions\' e-commerce platform...',
        additionalInsights: ['Zero-downtime migration strategy', 'Performance improved from 4.2s to 0.8s', 'Handled 100,000+ concurrent users', 'Used strangler fig pattern']
      },
      {
        questionId: 'technical-skills',
        answer: 'Expert-level React 18, Next.js 13, Node.js, PostgreSQL',
        confidence: 92,
        transcriptExcerpt: 'We chose React 18 with Next.js 13 for the frontend because of its excellent SSR capabilities and SEO benefits. For the backend, we went with Node.js and Express...',
        additionalInsights: ['Advanced performance optimization', 'GraphQL API design', 'WebSocket real-time features', 'Elasticsearch integration']
      },
      {
        questionId: 'challenges',
        answer: 'Migrated legacy PHP monolith with zero downtime',
        confidence: 96,
        transcriptExcerpt: 'The really challenging part - we couldn\'t afford any downtime. None. We were processing $2-3 million in sales daily, with peak traffic hitting 100,000+ concurrent users...',
        additionalInsights: ['Strangler fig migration pattern', 'Feature flag implementation', 'Database optimization', 'Performance monitoring']
      },
      {
        questionId: 'team-experience',
        answer: 'Led cross-functional teams, mentored junior developers',
        confidence: 88,
        transcriptExcerpt: 'I had to work with stakeholders across engineering, product, business, customer success, and finance to create a migration strategy...',
        additionalInsights: ['Managed stakeholder alignment', 'Technical mentoring', 'Code review processes', 'Architecture decisions']
      }
    ];

    // Mock readiness score
    const mockReadinessScore: InterviewReadinessScore = {
      overall: 94,
      technical: 96,
      cultural: 89,
      communication: 97,
      experience: 95,
      redFlags: 0
    };

    setInsights(mockInsights);
    setReadinessScore(mockReadinessScore);
    setIsAnalyzing(false);
  };

  useEffect(() => {
    analyzeTranscript();
  }, [candidateId]);

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600 bg-green-100';
    if (confidence >= 75) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 75) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Phone Screen Analysis: {candidateName}
        </h2>
        <p className="text-gray-600">
          See how our 18-minute voice recording compares to a traditional 30-minute phone screen
        </p>
      </div>

      {isAnalyzing ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Analyzing transcript...</span>
        </div>
      ) : (
        <>
          {/* Interview Readiness Score */}
          {readinessScore && (
            <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Interview Readiness Score</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-1">{readinessScore.overall}%</div>
                  <div className="text-sm text-gray-600">Overall Readiness</div>
                  <div className="text-xs text-green-600 font-medium">Ready for Technical Interview</div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Technical</span>
                      <span className="font-medium">{readinessScore.technical}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className={`h-2 rounded-full ${getScoreColor(readinessScore.technical)}`} style={{ width: `${readinessScore.technical}%` }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Experience</span>
                      <span className="font-medium">{readinessScore.experience}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className={`h-2 rounded-full ${getScoreColor(readinessScore.experience)}`} style={{ width: `${readinessScore.experience}%` }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Communication</span>
                      <span className="font-medium">{readinessScore.communication}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className={`h-2 rounded-full ${getScoreColor(readinessScore.communication)}`} style={{ width: `${readinessScore.communication}%` }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Cultural Fit</span>
                      <span className="font-medium">{readinessScore.cultural}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className={`h-2 rounded-full ${getScoreColor(readinessScore.cultural)}`} style={{ width: `${readinessScore.cultural}%` }}></div>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">{readinessScore.redFlags}</div>
                  <div className="text-sm text-gray-600">Red Flags</div>
                  <div className="text-xs text-green-600 font-medium">No Concerns Detected</div>
                </div>
              </div>
            </div>
          )}

          {/* Business Impact */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-purple-900 mb-2">Business Impact</h3>
            <div className="grid md:grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <div className="text-xl font-bold text-purple-600">30min</div>
                <div className="text-purple-700">Time Saved</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-purple-600">$75</div>
                <div className="text-purple-700">Cost Saved</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-purple-600">3x</div>
                <div className="text-purple-700">More Insights</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-purple-600">94%</div>
                <div className="text-purple-700">Interview Ready</div>
              </div>
            </div>
          </div>

          {/* Side-by-side Comparison */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Traditional Phone Screen */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Traditional 30-min Phone Screen
              </h3>
              <div className="space-y-3">
                {PHONE_SCREEN_QUESTIONS.map((question) => (
                  <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900 text-sm">{question.question}</h4>
                      <span className={`px-2 py-1 rounded text-xs ${
                        question.importance === 'high' ? 'bg-red-100 text-red-700' :
                        question.importance === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {question.importance}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 italic">{question.typicalAnswer}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Voice Recording Insights */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
                18-min Voice Recording Insights
              </h3>
              <div className="space-y-3">
                {insights.map((insight) => {
                  const question = PHONE_SCREEN_QUESTIONS.find(q => q.id === insight.questionId);
                  if (!question) return null;
                  
                  return (
                    <div key={insight.questionId} className="border border-green-200 bg-green-50 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-gray-900 text-sm">{question.question}</h4>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getConfidenceColor(insight.confidence)}`}>
                          {insight.confidence}% confident
                        </span>
                      </div>
                      <p className="text-sm text-gray-900 font-medium mb-2">{insight.answer}</p>
                      <p className="text-xs text-gray-600 italic mb-2 bg-white rounded p-2">
                        "{insight.transcriptExcerpt.substring(0, 100)}..."
                      </p>
                      <div className="space-y-1">
                        <div className="text-xs font-medium text-gray-700">Additional Insights:</div>
                        {insight.additionalInsights.map((additional, index) => (
                          <div key={index} className="text-xs text-green-700 flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            {additional}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Missing Questions */}
          <div className="mt-6 bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Questions Not Covered in Traditional Phone Screen</h4>
            <div className="grid md:grid-cols-2 gap-2 text-sm text-gray-600">
              <div>• Detailed architecture decisions</div>
              <div>• Performance optimization strategies</div>
              <div>• Stakeholder management experience</div>
              <div>• Business impact quantification</div>
              <div>• Technical leadership examples</div>
              <div>• Risk mitigation approaches</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}