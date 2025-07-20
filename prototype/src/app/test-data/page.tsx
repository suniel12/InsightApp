'use client';

import { useState, useEffect } from 'react';
import { testDataGenerator, TestDataPair } from '@/scripts/generate-test-data';
import Link from 'next/link';

export default function TestDataPage() {
  const [testPairs, setTestPairs] = useState<TestDataPair[]>([]);
  const [selectedPair, setSelectedPair] = useState<TestDataPair | null>(null);
  const [stats, setStats] = useState<any>(null);
  const [validation, setValidation] = useState<any>(null);

  useEffect(() => {
    // Load test data
    const pairs = testDataGenerator.getAllTestPairs();
    setTestPairs(pairs);
    
    // Get statistics
    const dataStats = testDataGenerator.getTestDataStats();
    setStats(dataStats);
    
    // Validate data
    const dataValidation = testDataGenerator.validateTestData();
    setValidation(dataValidation);
  }, []);

  const handleSimulateAI = (pair: TestDataPair) => {
    const aiResults = testDataGenerator.simulateAIProcessing(pair);
    console.log('AI Processing Results:', aiResults);
    alert(`AI processing simulated for ${pair.resume.candidateName}. Check console for details.`);
  };

  const downloadJSON = () => {
    const jsonData = testDataGenerator.exportToJSON();
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'test-data.json';
    a.click();
  };

  const downloadCSV = () => {
    const csvData = testDataGenerator.exportToCSV();
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'test-data.csv';
    a.click();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/" className="text-blue-600 hover:text-blue-700 mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Test Data Management</h1>
          <p className="text-gray-600 text-lg">
            Manage and analyze test resumes and transcriptions for prototype testing
          </p>
        </div>

        {/* Data Validation Status */}
        {validation && (
          <div className={`mb-6 p-4 rounded-lg ${validation.isValid ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            <h3 className={`font-semibold ${validation.isValid ? 'text-green-800' : 'text-red-800'}`}>
              Data Validation: {validation.isValid ? 'Valid' : 'Issues Found'}
            </h3>
            {!validation.isValid && (
              <ul className="mt-2 text-red-700">
                {validation.errors.map((error: string, index: number) => (
                  <li key={index} className="text-sm">• {error}</li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Statistics Dashboard */}
        {stats && (
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Candidates</h3>
              <p className="text-3xl font-bold text-blue-600">{stats.totalPairs}</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Avg Resume Length</h3>
              <p className="text-3xl font-bold text-green-600">{Math.round(stats.averageResumeLength / 1000)}k chars</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Avg Transcript Length</h3>
              <p className="text-3xl font-bold text-purple-600">{Math.round(stats.averageTranscriptLength / 1000)}k chars</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Key Topics</h3>
              <p className="text-3xl font-bold text-orange-600">{stats.totalKeyTopics}</p>
            </div>
          </div>
        )}

        {/* Format Distribution */}
        {stats && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Resume Format Distribution</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(stats.formatDistribution).map(([format, count]) => (
                <div key={format} className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{count as number}</div>
                  <div className="text-sm text-gray-600 capitalize">{format}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Export Tools */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Test Data</h3>
          <div className="flex gap-4">
            <button
              onClick={downloadJSON}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Download JSON
            </button>
            <button
              onClick={downloadCSV}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Download CSV
            </button>
          </div>
        </div>

        {/* Test Data Grid */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Test Candidates</h3>
          <div className="grid gap-4">
            {testPairs.map((pair, index) => (
              <div key={pair.resume.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">
                          {pair.resume.candidateName}
                        </h4>
                        <p className="text-sm text-gray-600">{pair.resume.fileName}</p>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Format:</span>
                        <span className="ml-1 capitalize">{pair.resume.format}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Duration:</span>
                        <span className="ml-1">{pair.transcription.duration}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Resume:</span>
                        <span className="ml-1">{Math.round(pair.resume.resumeText.length / 1000)}k chars</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Transcript:</span>
                        <span className="ml-1">{Math.round(pair.transcription.transcript.length / 1000)}k chars</span>
                      </div>
                    </div>
                    <div className="mt-3">
                      <span className="text-gray-500 text-sm">Key Topics:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {pair.transcription.keyTopics.map((topic, topicIndex) => (
                          <span
                            key={topicIndex}
                            className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => setSelectedPair(selectedPair?.resume.id === pair.resume.id ? null : pair)}
                      className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm transition-colors"
                    >
                      {selectedPair?.resume.id === pair.resume.id ? 'Hide' : 'View'}
                    </button>
                    <button
                      onClick={() => handleSimulateAI(pair)}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm transition-colors"
                    >
                      Simulate AI
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                {selectedPair?.resume.id === pair.resume.id && (
                  <div className="mt-6 border-t pt-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Resume Preview</h5>
                        <div className="bg-gray-50 rounded p-3 text-sm max-h-64 overflow-y-auto">
                          <pre className="whitespace-pre-wrap">{pair.resume.resumeText.substring(0, 500)}...</pre>
                        </div>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Transcript Preview</h5>
                        <div className="bg-gray-50 rounded p-3 text-sm max-h-64 overflow-y-auto">
                          <p>{pair.transcription.transcript.substring(0, 500)}...</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <h5 className="font-semibold text-gray-900 mb-2">Recording Prompts</h5>
                      <ul className="list-disc list-inside text-sm text-gray-700">
                        {pair.transcription.recordingPrompts.map((prompt, promptIndex) => (
                          <li key={promptIndex}>{prompt}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}