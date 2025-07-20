'use client';

import Link from 'next/link';
import { useState } from 'react';
import { testResumes } from '@/data/test-resumes';
import { testTranscriptions } from '@/data/test-transcriptions';

export default function PhoneScreenAnalysisPage() {
  const [selectedComparison, setSelectedComparison] = useState<'process' | 'questions' | 'insights'>('process');
  
  // ROI Calculator inputs
  const [hiresPerMonth, setHiresPerMonth] = useState(5);
  const [screensPerHire, setScreensPerHire] = useState(10);
  const [hourlyRate, setHourlyRate] = useState(125);

  // Dynamic calculations based on user inputs
  const totalScreensPerMonth = hiresPerMonth * screensPerHire;
  const traditionalTimeMinutes = totalScreensPerMonth * 30; // 30 min per phone screen
  const insightAppTimeMinutes = totalScreensPerMonth * 0; // Voice recordings eliminate phone screens entirely
  const timeSavedMinutes = traditionalTimeMinutes - insightAppTimeMinutes;
  const timeSavedHours = timeSavedMinutes / 60;
  const monthlyCostSaved = timeSavedHours * hourlyRate;
  const annualCostSaved = monthlyCostSaved * 12;

  const processComparison = [
    {
      stage: "Initial Screening",
      traditional: "30-min phone screen",
      insightApp: "18-min voice recording",
      improvement: "40% faster"
    },
    {
      stage: "Information Gathered",
      traditional: "5-7 basic questions",
      insightApp: "20+ detailed insights",
      improvement: "4x more insights"
    },
    {
      stage: "Technical Assessment",
      traditional: "Surface-level discussion",
      insightApp: "Deep technical projects",
      improvement: "Expert-level detail"
    },
    {
      stage: "Next Step",
      traditional: "Another screening call",
      insightApp: "Direct to technical interview",
      improvement: "Skip 90% of screens"
    }
  ];

  const phoneScreenQuestions = [
    {
      question: "Tell me about your background",
      traditional: "Basic role overview",
      insightApp: "Detailed career journey with specific achievements",
      confidence: 98
    },
    {
      question: "Walk through your recent project",
      traditional: "High-level project description",
      insightApp: "Architecture decisions, challenges, business impact",
      confidence: 95
    },
    {
      question: "What's your experience with [technology]?",
      traditional: "Years of experience claimed",
      insightApp: "Specific implementation examples and depth",
      confidence: 92
    },
    {
      question: "Tell me about a challenge you faced",
      traditional: "Brief problem description",
      insightApp: "Detailed problem-solving methodology",
      confidence: 94
    },
    {
      question: "Why are you looking to leave?",
      traditional: "Standard career growth answer",
      insightApp: "Authentic motivation and career goals",
      confidence: 89
    }
  ];

  const additionalInsights = [
    "Leadership and mentoring experience",
    "Cross-functional collaboration examples",
    "Performance optimization strategies",
    "Architecture and design decisions",
    "Stakeholder management skills",
    "Business impact quantification",
    "Technical communication ability",
    "Problem-solving methodology",
    "Team scaling experience",
    "Innovation and initiative examples"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <Link href="/employers" className="text-blue-600 hover:text-blue-700 mb-4 inline-block">
            ← Back to Employers
          </Link>
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-4">
            Replace Phone Screens
          </h1>
          <p className="text-gray-600 text-base sm:text-lg">
            See how InsightApp's voice recordings provide deeper insights than traditional phone screens in less time
          </p>
        </div>

        {/* Interactive ROI Calculator */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-8 mb-8">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">Calculate Your ROI</h3>
          
          {/* Input Sliders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-3">
                How many positions do you hire for in a month?
              </label>
              <div className="space-y-2">
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={hiresPerMonth}
                  onChange={(e) => setHiresPerMonth(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>1</span>
                  <span className="font-semibold text-lg text-blue-600">{hiresPerMonth}</span>
                  <span>50</span>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-3">
                How many phone screens do you do per hire?
              </label>
              <div className="space-y-2">
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={screensPerHire}
                  onChange={(e) => setScreensPerHire(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>1</span>
                  <span className="font-semibold text-lg text-blue-600">{screensPerHire}</span>
                  <span>50</span>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-3">
                Who does the phone screenings?
              </label>
              <select
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={75}>Junior Recruiter ($75/hr)</option>
                <option value={125}>Senior Recruiter ($125/hr)</option>
                <option value={150}>Hiring Manager ($150/hr)</option>
                <option value={200}>VP/Director ($200/hr)</option>
              </select>
            </div>
          </div>

          {/* Dynamic Results */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 sm:p-6 text-white text-center">
              <div className="text-2xl sm:text-3xl font-bold mb-2">{Math.round(timeSavedHours)}hrs</div>
              <div className="text-blue-100 text-sm sm:text-base">Time Saved/Month</div>
              <div className="text-xs sm:text-sm text-blue-200 mt-1">{totalScreensPerMonth} screens × 30min saved</div>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 sm:p-6 text-white text-center">
              <div className="text-2xl sm:text-3xl font-bold mb-2">
                ${monthlyCostSaved >= 1000 ? `${(monthlyCostSaved/1000).toFixed(1)}k` : Math.round(monthlyCostSaved)}
              </div>
              <div className="text-green-100 text-sm sm:text-base">Monthly Savings</div>
              <div className="text-xs sm:text-sm text-green-200 mt-1">
                ${annualCostSaved >= 1000 ? `${(annualCostSaved/1000).toFixed(0)}k` : Math.round(annualCostSaved)}/year
              </div>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-4 sm:p-6 text-white text-center">
              <div className="text-2xl sm:text-3xl font-bold mb-2">4x</div>
              <div className="text-purple-100 text-sm sm:text-base">More Insights</div>
              <div className="text-xs sm:text-sm text-purple-200 mt-1">20+ vs 5-7 data points</div>
            </div>
          </div>
        </div>

        {/* Comparison Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              <button
                onClick={() => setSelectedComparison('process')}
                className={`px-6 py-3 border-b-2 font-medium text-sm ${
                  selectedComparison === 'process'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Process Comparison
              </button>
              <button
                onClick={() => setSelectedComparison('questions')}
                className={`px-6 py-3 border-b-2 font-medium text-sm ${
                  selectedComparison === 'questions'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Question Analysis
              </button>
              <button
                onClick={() => setSelectedComparison('insights')}
                className={`px-6 py-3 border-b-2 font-medium text-sm ${
                  selectedComparison === 'insights'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Additional Insights
              </button>
            </nav>
          </div>

          <div className="p-6">
            {selectedComparison === 'process' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Hiring Process Transformation</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Stage</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Traditional Approach</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">InsightApp Approach</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Improvement</th>
                      </tr>
                    </thead>
                    <tbody>
                      {processComparison.map((row, index) => (
                        <tr key={index} className="border-b border-gray-100">
                          <td className="py-4 px-4 font-medium text-gray-900">{row.stage}</td>
                          <td className="py-4 px-4 text-gray-600">{row.traditional}</td>
                          <td className="py-4 px-4 text-green-600 font-medium">{row.insightApp}</td>
                          <td className="py-4 px-4">
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
                              {row.improvement}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {selectedComparison === 'questions' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Phone Screen Questions Already Answered</h3>
                <div className="space-y-4">
                  {phoneScreenQuestions.map((item, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-medium text-gray-900">{item.question}</h4>
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                          {item.confidence}% confident
                        </span>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm font-medium text-gray-600 mb-1">Traditional Phone Screen</div>
                          <div className="text-sm text-gray-800 bg-gray-50 rounded p-3">{item.traditional}</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-green-600 mb-1">Voice Recording Insights</div>
                          <div className="text-sm text-gray-800 bg-green-50 rounded p-3">{item.insightApp}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedComparison === 'insights' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Insights Not Available in Traditional Phone Screens</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">What Phone Screens Miss</h4>
                    <div className="space-y-2">
                      {additionalInsights.map((insight, index) => (
                        <div key={index} className="flex items-center text-gray-600">
                          <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {insight}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-6">
                    <h4 className="font-medium text-blue-900 mb-3">Why This Matters</h4>
                    <div className="space-y-3 text-sm text-blue-800">
                      <p>
                        <strong>Better Hiring Decisions:</strong> Technical depth and real project examples provide accurate assessment of capabilities.
                      </p>
                      <p>
                        <strong>Reduced Bias:</strong> Structured voice recordings eliminate interviewer variability and ensure consistent evaluation.
                      </p>
                      <p>
                        <strong>Candidate Experience:</strong> No scheduling conflicts, candidates can record when they perform best.
                      </p>
                      <p>
                        <strong>Scalability:</strong> Evaluate more candidates without increasing interviewer load.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>


        {/* Call to Action */}
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">Ready to Transform Your Hiring Process?</h3>
          <p className="text-gray-600 mb-6">
            Start evaluating candidates with deeper insights in less time
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              href="/employers" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Explore Candidates
            </Link>
            <Link 
              href="/employers/query" 
              className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Try Search
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}