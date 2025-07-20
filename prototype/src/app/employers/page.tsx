'use client';

import Link from 'next/link';
import { useState } from 'react';
import { testResumes } from '@/data/test-resumes';
import { testTranscriptions } from '@/data/test-transcriptions';
import { candidateQueryEngine, QueryResponse } from '@/lib/openai';

export default function EmployersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [queryResults, setQueryResults] = useState<QueryResponse | null>(null);
  const [isQuerying, setIsQuerying] = useState(false);
  const [showResults, setShowResults] = useState(false);
  // Combine resume and transcript data
  const candidates = testResumes.map(resume => {
    const transcript = testTranscriptions.find(t => t.resumeId === resume.id);
    return {
      ...resume,
      transcript
    };
  }).filter(candidate => candidate.transcript);

  const handleAISearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsQuerying(true);
    try {
      const response = await candidateQueryEngine.queryKnowledgeBank(searchQuery);
      setQueryResults(response);
      setShowResults(true);
    } catch (error) {
      console.error('Query error:', error);
      alert(`Error processing query: ${error instanceof Error ? error.message : 'Please try again.'}`);
    } finally {
      setIsQuerying(false);
    }
  };

  const clearResults = () => {
    setShowResults(false);
    setQueryResults(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/" className="text-blue-600 hover:text-blue-700 mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Candidate Search</h1>
          <p className="text-gray-600 text-lg">
            Find the perfect candidates through natural language queries
          </p>
        </div>

        {/* Search Interface */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Candidates
            </label>
            <div className="flex gap-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g., 'Show me React developers who have scaled applications to 100k+ users'"
                className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              />
              <button 
                onClick={handleAISearch}
                disabled={!searchQuery.trim() || isQuerying}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  !searchQuery.trim() || isQuerying
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isQuerying ? 'Searching...' : 'AI Search'}
              </button>
            </div>
          </div>

          <div className="mb-4">
            <div className="text-sm font-medium text-gray-700 mb-2">Popular Searches</div>
            <div className="flex flex-wrap gap-2">
              {[
                "React developers with 5+ years experience",
                "Python engineers who have built APIs",
                "Frontend developers with design skills",
                "DevOps engineers with AWS experience",
                "Full-stack developers with startup experience"
              ].map((query, index) => (
                <button
                  key={index}
                  onClick={() => setSearchQuery(query)}
                  className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
                >
                  {query}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Natural language queries
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              AI-powered matching
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Rich candidate insights
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h3 className="font-semibold text-gray-900 mb-4">Filters</h3>
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900">
                <option>All levels</option>
                <option>Junior (1-3 years)</option>
                <option>Mid (3-5 years)</option>
                <option>Senior (5+ years)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Technology</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900">
                <option>All technologies</option>
                <option>React</option>
                <option>Python</option>
                <option>Java</option>
                <option>AWS</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900">
                <option>All locations</option>
                <option>San Francisco, CA</option>
                <option>New York, NY</option>
                <option>Seattle, WA</option>
                <option>Austin, TX</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900">
                <option>All</option>
                <option>Immediately</option>
                <option>Within 2 weeks</option>
                <option>Within 1 month</option>
              </select>
            </div>
          </div>
        </div>

        {/* Query Results or Candidate Grid */}
        {showResults && queryResults ? (
          <div className="mb-8">
            {/* Results Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                Query Results
              </h2>
              <button 
                onClick={clearResults}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                ← Back to Browse Candidates
              </button>
            </div>

            {/* Query Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-4 text-sm text-gray-900">
                <span>Query: "{queryResults.query}"</span>
                <span>•</span>
                <span>{queryResults.totalCandidates} candidates analyzed</span>
                <span>•</span>
                <span>{queryResults.processingTime}ms</span>
              </div>
              <p className="text-blue-800 mt-2">{queryResults.summary}</p>
            </div>

            {/* Query Results */}
            <div className="space-y-4">
              {queryResults.results.map((result, index) => (
                <div key={result.candidateId} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                  <div className="flex items-start justify-between mb-4">
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
        ) : (
          <>
            {/* Regular Candidate Browse */}
            <div className="mb-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-gray-900">
                  {candidates.length} Candidates Found
                </h2>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-900">Sort by:</span>
                  <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900">
                    <option>Relevance</option>
                    <option>Experience</option>
                    <option>Most Recent</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
          {candidates.map((candidate) => {
            const role = candidate.resumeText.split('\n').find(line => 
              line.includes('Developer') || line.includes('Engineer') || line.includes('Lead')
            ) || 'Software Developer';
            
            return (
              <Link 
                key={candidate.id} 
                href={`/employers/candidates/${candidate.id}`}
                className="block"
              >
                <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 cursor-pointer">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-lg mr-4">
                        {candidate.candidateName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">
                          {candidate.candidateName}
                        </h3>
                        <p className="text-gray-600 mb-1">{role.trim()}</p>
                        <p className="text-sm text-gray-500">San Francisco, CA</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500 mb-1">Recording</div>
                      <div className="text-lg font-semibold text-blue-600">
                        {candidate.transcript?.duration}
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-gray-700 text-sm line-clamp-3">
                      {candidate.transcript?.transcript.substring(0, 200)}...
                    </p>
                  </div>

                  <div className="mb-4">
                    <div className="text-xs text-gray-500 mb-2">Key Topics</div>
                    <div className="flex flex-wrap gap-1">
                      {candidate.transcript?.keyTopics.slice(0, 3).map((topic, index) => (
                        <span 
                          key={index}
                          className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded"
                        >
                          {topic}
                        </span>
                      ))}
                      {candidate.transcript && candidate.transcript.keyTopics.length > 3 && (
                        <span className="text-xs text-gray-500">
                          +{candidate.transcript.keyTopics.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="border-t pt-4 flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-500">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      {candidate.format} resume
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-gray-600">{Math.round(candidate.resumeText.length / 1000)}k chars</span>
                      <span className="text-blue-600 font-medium">
                        View Profile →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <button className="border border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors">
                Load More Candidates
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}