'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { candidateQueryEngine, QueryResponse } from '@/lib/openai';
import { queryStorage, StoredQuery } from '@/lib/query-storage';

export default function QueryPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<QueryResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [recentQueries, setRecentQueries] = useState<StoredQuery[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [showTemplates, setShowTemplates] = useState(false);

  const questionTemplates = candidateQueryEngine.getQuestionTemplates();

  useEffect(() => {
    // Load recent queries
    const recent = queryStorage.getRecentQueries(5);
    setRecentQueries(recent);
  }, []);

  const handleQuery = async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      const response = await candidateQueryEngine.queryKnowledgeBank(query);
      setResults(response);

      // Save query to history
      queryStorage.saveQuery(query, response);
      
      // Update recent queries
      const recent = queryStorage.getRecentQueries(5);
      setRecentQueries(recent);

    } catch (error) {
      console.error('Query error:', error);
      alert(`Error processing query: ${error instanceof Error ? error.message : 'Please try again.'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTemplateSelect = (templateQuery: string) => {
    setQuery(templateQuery);
    setSelectedTemplate(templateQuery);
    setShowTemplates(false);
  };

  const handleRecentQuerySelect = (storedQuery: StoredQuery) => {
    setQuery(storedQuery.query);
    setResults(storedQuery.results);
  };

  const toggleFavorite = (queryId: string) => {
    queryStorage.toggleFavorite(queryId);
    const recent = queryStorage.getRecentQueries(5);
    setRecentQueries(recent);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <Link href="/employers" className="text-blue-600 hover:text-blue-700 mb-4 inline-block">
            ← Back to Search
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Candidate Q&A</h1>
          <p className="text-gray-900 text-lg">
            Ask natural language questions to find the best candidates from your knowledge bank
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Query Interface */}
          <div className="lg:col-span-2">

            {/* Query Input */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Ask a Question</h3>
              
              <div className="mb-4">
                <textarea
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g., 'Who has the most experience with React and has led technical teams?' or 'Which candidates have built scalable systems handling millions of users?'"
                  className="w-full h-24 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-gray-900"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleQuery}
                  disabled={isLoading || !query.trim()}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                    isLoading || !query.trim()
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {isLoading ? 'Processing...' : 'Search Candidates'}
                </button>
                
                <button
                  onClick={() => setShowTemplates(!showTemplates)}
                  className="border border-gray-300 hover:border-gray-400 text-gray-900 px-4 py-3 rounded-lg font-medium transition-colors"
                >
                  Question Templates
                </button>
              </div>

              {/* Template Dropdown */}
              {showTemplates && (
                <div className="mt-4 border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <h4 className="font-medium text-gray-900 mb-3">Select a Template Question</h4>
                  {questionTemplates.map((category, categoryIndex) => (
                    <div key={categoryIndex} className="mb-4">
                      <h5 className="text-sm font-medium text-gray-900 mb-2">{category.category}</h5>
                      <div className="space-y-1">
                        {category.questions.map((templateQuery, questionIndex) => (
                          <button
                            key={questionIndex}
                            onClick={() => handleTemplateSelect(templateQuery)}
                            className="block w-full text-left text-sm text-gray-900 hover:text-blue-600 hover:bg-white p-2 rounded transition-colors"
                          >
                            {templateQuery}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Results */}
            {results && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Results</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-900">
                    <span>Query: "{results.query}"</span>
                    <span>•</span>
                    <span>{results.totalCandidates} candidates analyzed</span>
                    <span>•</span>
                    <span>{results.processingTime}ms</span>
                  </div>
                </div>

                {/* Summary */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <h4 className="font-medium text-blue-900 mb-2">Summary</h4>
                  <p className="text-blue-800">{results.summary}</p>
                </div>

                {/* Candidate Results */}
                <div className="space-y-4">
                  {results.results.map((result, index) => (
                    <div key={result.candidateId} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-3 ${
                            result.relevanceScore >= 8 ? 'bg-green-500' :
                            result.relevanceScore >= 6 ? 'bg-yellow-500' : 'bg-gray-500'
                          }`}>
                            {index + 1}
                          </div>
                          <div>
                            <Link 
                              href={`/employers/candidates/${result.candidateId}`}
                              className="text-lg font-semibold text-blue-600 hover:text-blue-700"
                            >
                              {result.candidateName}
                            </Link>
                            <div className="flex items-center gap-2 mt-1">
                              <div className={`px-2 py-1 rounded text-xs font-medium ${
                                result.relevanceScore >= 8 ? 'bg-green-100 text-green-800' :
                                result.relevanceScore >= 6 ? 'bg-yellow-100 text-yellow-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {result.relevanceScore}/10 match
                              </div>
                              <span className="text-xs text-gray-500 capitalize">
                                Source: {result.sourceType}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-gray-900 mb-4">{result.reasoning}</p>
                      <p className="text-sm text-gray-900 italic">{result.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Queries */}
            {recentQueries.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Queries</h3>
                <div className="space-y-3">
                  {recentQueries.map((storedQuery) => (
                    <div key={storedQuery.id} className="border border-gray-200 rounded p-3">
                      <button
                        onClick={() => handleRecentQuerySelect(storedQuery)}
                        className="text-sm text-gray-900 hover:text-blue-600 text-left w-full mb-2"
                      >
                        "{storedQuery.query.length > 60 ? storedQuery.query.substring(0, 60) + '...' : storedQuery.query}"
                      </button>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-900">
                          {queryStorage.formatTimestamp(storedQuery.timestamp)}
                        </span>
                        <button
                          onClick={() => toggleFavorite(storedQuery.id)}
                          className={`text-xs ${storedQuery.favorite ? 'text-yellow-500' : 'text-gray-400'} hover:text-yellow-500`}
                        >
                          ★
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Knowledge Bank</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-900">Total Candidates</span>
                  <span className="font-medium text-gray-900">10</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-900">Resumes</span>
                  <span className="font-medium text-gray-900">10</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-900">Transcripts</span>
                  <span className="font-medium text-gray-900">10</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-900">Question Templates</span>
                  <span className="font-medium text-gray-900">{questionTemplates.reduce((sum, cat) => sum + cat.questions.length, 0)}</span>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Query Tips</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Be specific about skills and experience</li>
                <li>• Ask about past projects and challenges</li>
                <li>• Include context about your requirements</li>
                <li>• Use natural language - no need for keywords</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}