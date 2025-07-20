'use client';

import Link from 'next/link';
import { use } from 'react';
import { mockCandidates } from '@/data/candidates';
import { notFound } from 'next/navigation';

interface CandidateProfilePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function CandidateProfilePage({ params }: CandidateProfilePageProps) {
  const { id } = use(params);
  const candidate = mockCandidates.find(c => c.id === id);
  
  if (!candidate) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <Link href="/candidates" className="text-blue-600 hover:text-blue-700 mb-4 inline-block">
            ← Back to All Candidates
          </Link>
        </div>

        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-2xl mr-6">
                {candidate.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {candidate.name}
                </h1>
                <p className="text-xl text-gray-600 mb-2">{candidate.role}</p>
                <p className="text-gray-500">{candidate.location}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500 mb-1">Experience</div>
              <div className="text-2xl font-bold text-blue-600">
                {candidate.experienceYears} years
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 pt-6 border-t">
            <div>
              <div className="text-sm text-gray-500 mb-2">Availability</div>
              <div className="font-medium">{candidate.availability}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-2">Salary Range</div>
              <div className="font-medium">{candidate.salary}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-2">Recording Length</div>
              <div className="font-medium">{candidate.recording.duration}</div>
            </div>
          </div>
        </div>

        {/* AI Summary */}
        <div className="bg-blue-50 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            AI Summary
          </h2>
          <p className="text-gray-700">{candidate.recording.aiSummary}</p>
        </div>

        {/* Key Highlights */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Key Highlights</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {candidate.recording.highlights.map((highlight, index) => (
              <div key={index} className="flex items-center">
                <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Skills & Technologies</h2>
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Primary Skills</h3>
            <div className="flex flex-wrap gap-2">
              {candidate.skills.primary.map((skill, index) => (
                <span key={index} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Secondary Skills</h3>
            <div className="flex flex-wrap gap-2">
              {candidate.skills.secondary.map((skill, index) => (
                <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>


        {/* Projects */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Key Projects</h2>
          <div className="space-y-6">
            {candidate.projects.map((project, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-gray-900 mb-2">{project.title}</h3>
                <p className="text-gray-700 mb-3">{project.description}</p>
                
                <div className="mb-3">
                  <div className="text-sm font-medium text-gray-700 mb-1">Technologies</div>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-3">
                  <div className="text-sm font-medium text-green-700 mb-1">Impact</div>
                  <p className="text-sm text-gray-700">{project.impact}</p>
                </div>

                <div>
                  <div className="text-sm font-medium text-orange-700 mb-1">Challenges</div>
                  <p className="text-sm text-gray-700">{project.challenges}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recording Transcript Preview */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recording Transcript (Preview)</h2>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-700 leading-relaxed">
              {candidate.recording.transcript.substring(0, 500)}...
            </p>
            <button className="mt-3 text-blue-600 hover:text-blue-700 text-sm font-medium">
              Read Full Transcript →
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4 justify-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium">
            Listen to Recording
          </button>
          <button className="border border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-3 rounded-lg font-medium">
            Download Profile
          </button>
          <button className="border border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-3 rounded-lg font-medium">
            Contact Candidate
          </button>
        </div>
      </div>
    </div>
  );
}