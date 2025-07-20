'use client';

import { useState } from 'react';
import { candidateQueryEngine } from '@/lib/openai';

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

interface QueryModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidateId: string;
  candidateName: string;
}

export default function QueryModal({ isOpen, onClose, candidateId, candidateName }: QueryModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SingleCandidateQueryResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleQuery = async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/query/candidate/${candidateId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Query failed');
      }

      const result = await response.json();
      setResults(result);
    } catch (error) {
      console.error('Query error:', error);
      alert(`Error processing query: ${error instanceof Error ? error.message : 'Please try again.'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setQuery('');
    setResults(null);
    onClose();
  };

  const suggestedQuestions = [
    "What are their strongest technical skills?",
    "What leadership experience do they have?",
    "What projects have they worked on?",
    "How do they handle challenges?",
    "What makes them unique as a candidate?"
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-900">
              Query {candidateName}
            </h2>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Query Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Ask a question about this candidate
            </label>
            <div className="mb-4">
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g., 'What experience does this candidate have with React and team leadership?'"
                className="w-full h-20 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-gray-900"
              />
            </div>

            <div className="flex gap-3 mb-4">
              <button
                onClick={handleQuery}
                disabled={isLoading || !query.trim()}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  isLoading || !query.trim()
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isLoading ? 'Analyzing...' : 'Analyze Candidate'}
              </button>
            </div>

            {/* Suggested Questions */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Suggested Questions</h4>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => setQuery(suggestion)}
                    className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results */}
          {results && (
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Analysis Results</h3>
              
              {/* Query Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-4 text-sm text-gray-900">
                  <span>Query: "{results.query}"</span>
                  <span>•</span>
                  <span>{results.processingTime}ms</span>
                </div>
              </div>

              {/* Result */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {candidateName.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{candidateName}</h4>
                    <div className="flex items-center gap-2">
                      <div className={`px-2 py-1 rounded text-xs font-medium ${
                        results.candidate.confidence >= 8 ? 'bg-green-100 text-green-800' :
                        results.candidate.confidence >= 6 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {results.candidate.confidence}/10 confidence
                      </div>
                      <span className="text-xs text-gray-500 capitalize">
                        Source: {results.candidate.sourceType}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Assessment</h5>
                    <p className="text-gray-900 mb-4">{results.candidate.reasoning}</p>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Detailed Analysis</h5>
                    <p className="text-sm text-gray-900">{results.candidate.answer}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t bg-gray-50 flex justify-end">
          <button
            onClick={handleClose}
            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}