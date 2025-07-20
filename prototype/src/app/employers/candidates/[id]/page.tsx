'use client';

import Link from 'next/link';
import { useState, use } from 'react';
import { testResumes } from '@/data/test-resumes';
import { testTranscriptions } from '@/data/test-transcriptions';
import { notFound } from 'next/navigation';
import QueryModal from '@/components/QueryModal';

interface EmployerCandidateProfilePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function EmployerCandidateProfilePage({ params }: EmployerCandidateProfilePageProps) {
  const [showFullResume, setShowFullResume] = useState(false);
  const [showFullTranscript, setShowFullTranscript] = useState(false);
  const [showQueryModal, setShowQueryModal] = useState(false);
  
  // Unwrap the async params using React.use()
  const { id } = use(params);
  
  const resume = testResumes.find(r => r.id === id);
  const transcript = testTranscriptions.find(t => t.resumeId === id);
  
  if (!resume || !transcript) {
    notFound();
  }

  // Extract basic info from resume text
  const resumeLines = resume.resumeText.split('\n').filter(line => line.trim());
  const candidateName = resume.candidateName;
  
  // Extract role from resume (usually second line)
  const roleMatch = resumeLines.find(line => 
    line.includes('Developer') || line.includes('Engineer') || line.includes('Lead')
  );
  const role = roleMatch || 'Software Developer';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <Link href="/employers" className="text-blue-600 hover:text-blue-700 mb-4 inline-block">
            ← Back to Search Results
          </Link>
        </div>

        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-2xl mr-6">
                {candidateName.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {candidateName}
                </h1>
                <p className="text-xl text-gray-600 mb-2">{role}</p>
                <p className="text-gray-500">San Francisco, CA</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500 mb-1">Recording Length</div>
              <div className="text-2xl font-bold text-blue-600">
                {transcript.duration}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 pt-6 border-t">
            <div>
              <div className="text-sm text-gray-500 mb-2">Resume Format</div>
              <div className="font-medium capitalize">{resume.format}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-2">Key Topics</div>
              <div className="flex flex-wrap gap-1">
                {transcript.keyTopics.slice(0, 2).map((topic, index) => (
                  <span key={index} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                    {topic}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-2">Recording Prompts</div>
              <div className="font-medium">{transcript.recordingPrompts.length} questions answered</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Resume Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Resume</h2>
              <span className="text-sm text-gray-500">{resume.fileName}</span>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono leading-relaxed">
                {showFullResume 
                  ? resume.resumeText 
                  : resume.resumeText.substring(0, 800) + (resume.resumeText.length > 800 ? '...' : '')
                }
              </pre>
              
              {resume.resumeText.length > 800 && (
                <button
                  onClick={() => setShowFullResume(!showFullResume)}
                  className="mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
                >
                  {showFullResume ? (
                    <>
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                      Show Less
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                      Read Full Resume ({Math.round(resume.resumeText.length / 1000)}k characters)
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Transcript Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Conversation Transcript</h2>
              <span className="text-sm text-gray-500">{transcript.duration}</span>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-700 leading-relaxed">
                {showFullTranscript 
                  ? transcript.transcript.split('\n').map((paragraph, index) => (
                      <p key={index} className="mb-4 last:mb-0">
                        {paragraph}
                      </p>
                    ))
                  : (
                    <p>
                      {transcript.transcript.substring(0, 1000) + (transcript.transcript.length > 1000 ? '...' : '')}
                    </p>
                  )
                }
              </div>
              
              {transcript.transcript.length > 1000 && (
                <button
                  onClick={() => setShowFullTranscript(!showFullTranscript)}
                  className="mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
                >
                  {showFullTranscript ? (
                    <>
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                      Show Less
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                      Read Full Transcript ({Math.round(transcript.transcript.length / 1000)}k characters)
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Recording Prompts */}
        <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recording Prompts</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {transcript.recordingPrompts.map((prompt, index) => (
              <div key={index} className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                    {index + 1}
                  </div>
                  <p className="text-gray-700">{prompt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Topics */}
        <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Topics Discussed</h2>
          <div className="flex flex-wrap gap-3">
            {transcript.keyTopics.map((topic, index) => (
              <span
                key={index}
                className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>

        {/* AI Analysis Placeholder */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            AI-Powered Insights
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">Technical Depth</h3>
              <div className="flex items-center">
                <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                </div>
                <span className="text-sm text-gray-600">9/10</span>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">Leadership Experience</h3>
              <div className="flex items-center">
                <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
                <span className="text-sm text-gray-600">8.5/10</span>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">Business Impact</h3>
              <div className="flex items-center">
                <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
                <span className="text-sm text-gray-600">9.2/10</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center mt-8">
          <button 
            onClick={() => setShowQueryModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Query This Candidate
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            Schedule Interview
          </button>
          <button className="border border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors">
            Save Candidate
          </button>
          <button className="border border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors">
            Export Profile
          </button>
        </div>

        {/* Query Modal */}
        <QueryModal
          isOpen={showQueryModal}
          onClose={() => setShowQueryModal(false)}
          candidateId={id}
          candidateName={candidateName}
        />
      </div>
    </div>
  );
}