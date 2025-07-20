'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [selectedRole, setSelectedRole] = useState<'candidate' | 'employer'>('candidate');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        {/* Role Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-lg p-1 shadow-sm">
            <button
              onClick={() => setSelectedRole('candidate')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                selectedRole === 'candidate'
                  ? 'text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              style={selectedRole === 'candidate' ? {backgroundColor: '#1F5F5F'} : {}}
            >
              I'm a Candidate
            </button>
            <button
              onClick={() => setSelectedRole('employer')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                selectedRole === 'employer'
                  ? 'text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              style={selectedRole === 'employer' ? {backgroundColor: '#1F5F5F'} : {}}
            >
              I'm an Employer
            </button>
          </div>
        </div>

        {/* Candidate Experience */}
        {selectedRole === 'candidate' && (
          <>
            {/* Hero Section */}
            <div className="text-center mb-16">
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Go Beyond Resumes
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Describe the projects you love in as much detail as you want.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/record">
                  <button className="text-white px-8 py-3 rounded-lg font-semibold transition-colors hover:opacity-90" style={{backgroundColor: '#1F5F5F'}}>
                    Start Recording
                  </button>
                </Link>
                <button className="border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-3 rounded-lg font-semibold transition-colors">
                  Learn More
                </button>
              </div>
            </div>

            {/* How It Works for Candidates */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                How It Works
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{backgroundColor: '#1F5F5F20'}}>
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#1F5F5F'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">Upload Your Resume</h3>
                  <p className="text-gray-600">Start with your existing resume as the foundation. No need to worry about length or formatting.</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{backgroundColor: '#1F5F5F30'}}>
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#1F5F5F'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">Record Your Stories</h3>
                  <p className="text-gray-600">Bring your resume to life by sharing the stories behind your projects, challenges, and accomplishments.</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{backgroundColor: '#1F5F5F40'}}>
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#1F5F5F'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">Skip Repetitive Forms</h3>
                  <p className="text-gray-600">Never fill out the same administrative questions again. Answer once, apply everywhere.</p>
                </div>
              </div>
            </div>

            {/* Benefits for Candidates */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Why Candidates Love InsightApp
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-gray-900">No More Customizing Resume</h3>
                    <p className="text-gray-600 text-sm">Skip the tedious resume optimization and keyword stuffing</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-gray-900">Reusable Profile</h3>
                    <p className="text-gray-600 text-sm">One recording works for multiple job opportunities</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-gray-900">Authentic Representation</h3>
                    <p className="text-gray-600 text-sm">Share the story behind your accomplishments</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Employer Experience */}
        {selectedRole === 'employer' && (
          <>
            {/* Hero Section */}
            <div className="text-center mb-16">
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Discover Talent Through Conversation
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Skip the phone screens. Query candidate experiences using natural language and understand their true capabilities through authentic conversations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/employers">
                  <button className="text-white px-8 py-3 rounded-lg font-semibold transition-colors hover:opacity-90" style={{backgroundColor: '#1F5F5F'}}>
                    Browse Candidates
                  </button>
                </Link>
                <button className="border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-3 rounded-lg font-semibold transition-colors">
                  Schedule Demo
                </button>
              </div>
            </div>

            {/* How It Works for Employers */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                How It Works for Employers
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{backgroundColor: '#1F5F5F20'}}>
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#1F5F5F'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">Defeat AI-Generated Applications</h3>
                  <p className="text-gray-600">Traditional keyword matching is broken. Candidates AI-customize resumes for every job. Analyze actual experience instead of optimized keywords.</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{backgroundColor: '#1F5F5F30'}}>
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#1F5F5F'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">Scale Your Screening Process</h3>
                  <p className="text-gray-600">10 applications? Deep-dive with Q&A to skip phone screens. 1000+ applications? Automate scoring to surface top 50, then manually select final 10.</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{backgroundColor: '#1F5F5F40'}}>
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#1F5F5F'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">Save Time & Money</h3>
                  <p className="text-gray-600">Reduce phone screens by 90% and make better hiring decisions with deeper candidate understanding.</p>
                </div>
              </div>
            </div>

            {/* Demo Profiles Preview */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Demo Candidate Profiles
              </h2>
              <p className="text-gray-600 text-center mb-8">
                Experience how candidates share their stories through conversational recordings
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: "Sarah Chen", role: "Senior React Developer", experience: "5 years", skills: ["React", "TypeScript", "Node.js"] },
                  { name: "Marcus Johnson", role: "Full-Stack Engineer", experience: "3 years", skills: ["Python", "Django", "PostgreSQL"] },
                  { name: "Priya Patel", role: "Frontend Developer", experience: "4 years", skills: ["Vue.js", "CSS", "Figma"] },
                  { name: "Alex Rodriguez", role: "DevOps Engineer", experience: "6 years", skills: ["AWS", "Docker", "Kubernetes"] },
                  { name: "Emily Zhang", role: "Data Scientist", experience: "3 years", skills: ["Python", "TensorFlow", "SQL"] },
                  { name: "Jordan Kim", role: "Mobile Developer", experience: "4 years", skills: ["React Native", "Swift", "Kotlin"] }
                ].map((candidate, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold mb-3">
                      {candidate.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <h3 className="font-semibold text-gray-900">{candidate.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{candidate.role}</p>
                    <p className="text-xs text-gray-500 mb-3">{candidate.experience} experience</p>
                    <div className="flex flex-wrap gap-1">
                      {candidate.skills.slice(0, 3).map((skill, skillIndex) => (
                        <span key={skillIndex} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-8">
                <Link href="/employers">
                  <button className="text-white px-6 py-2 rounded-lg font-medium transition-colors hover:opacity-90" style={{backgroundColor: '#1F5F5F'}}>
                    Explore All Candidates
                  </button>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}