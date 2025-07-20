'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function RecordPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    // Mock timer
    const timer = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
    
    // Auto stop after 30 seconds for demo
    setTimeout(() => {
      clearInterval(timer);
      setIsRecording(false);
      setCurrentStep(3);
    }, 30000);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setCurrentStep(3);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const recordingPrompts = [
    "Tell me about your most challenging project and how you solved it.",
    "Describe a time when you had to learn a new technology quickly.",
    "Walk me through your approach to debugging a complex issue.",
    "Share an example of how you've mentored or helped a teammate.",
    "Describe a project where you had to balance technical debt with new features."
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <Link href="/" className="text-blue-600 hover:text-blue-700 mb-4 inline-block">
            ← Back to Home
          </Link>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            <div className={`flex items-center ${currentStep >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                1
              </div>
              <span className="ml-2 text-sm font-medium">Upload Resume</span>
            </div>
            <div className={`w-8 h-0.5 ${currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center ${currentStep >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                2
              </div>
              <span className="ml-2 text-sm font-medium">Record Experience</span>
            </div>
            <div className={`w-8 h-0.5 ${currentStep >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center ${currentStep >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                currentStep >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                3
              </div>
              <span className="ml-2 text-sm font-medium">AI Creates Profile</span>
            </div>
          </div>
        </div>

        {/* Step 1: Resume Upload */}
        {currentStep === 1 && (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Upload Your Resume
            </h1>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Start by uploading your current resume. We'll use this as a foundation and then enhance it with your 
              personal stories and experiences through our conversation-based approach.
            </p>

            <div className="max-w-lg mx-auto mb-8">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-blue-400 transition-colors">
                <input
                  type="file"
                  id="resume-upload"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <label htmlFor="resume-upload" className="cursor-pointer">
                  <div className="text-center">
                    <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="text-lg font-medium text-gray-900 mb-2">
                      {uploadedFile ? uploadedFile.name : 'Drop your resume here'}
                    </p>
                    <p className="text-sm text-gray-500">
                      or click to browse (PDF, DOC, DOCX)
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {uploadedFile && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 max-w-lg mx-auto">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-green-700">
                    Resume uploaded successfully: {uploadedFile.name}
                  </span>
                </div>
              </div>
            )}

            <div className="space-y-4 mb-8 text-left max-w-2xl mx-auto">
              <div className="flex items-center text-sm text-gray-600">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Your resume helps us understand your background
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                We'll extract key projects and skills automatically
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Your data is secure and private
              </div>
            </div>

            <button 
              onClick={() => setCurrentStep(2)}
              disabled={!uploadedFile}
              className={`px-8 py-4 rounded-lg font-semibold text-lg transition-colors ${
                uploadedFile 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Continue to Recording
            </button>
          </div>
        )}

        {/* Step 2: Recording */}
        {currentStep === 2 && !isRecording && (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Share Your Experience
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Now let's bring your resume to life! Record a 10-15 minute conversation about your key projects, 
              challenges you've solved, and what makes you passionate about your work.
            </p>

            <div className="bg-blue-50 rounded-lg p-6 mb-8 text-left max-w-2xl mx-auto">
              <h3 className="font-semibold text-gray-900 mb-3">Talk about these topics:</h3>
              <ul className="space-y-2 text-gray-700">
                {recordingPrompts.map((prompt, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    {prompt}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-center text-sm text-gray-600">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Your recording is private and secure
              </div>
              <div className="flex items-center justify-center text-sm text-gray-600">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Speak naturally - we'll clean up the transcript
              </div>
            </div>

            <button 
              onClick={handleStartRecording}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Start Recording
            </button>
          </div>
        )}

        {/* Step 2: Recording in Progress */}
        {currentStep === 2 && isRecording && (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <div className="w-12 h-12 bg-red-500 rounded-full"></div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Recording in Progress
            </h2>
            <div className="text-4xl font-mono font-bold text-red-600 mb-6">
              {formatTime(recordingTime)}
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-8 max-w-2xl mx-auto">
              <p className="text-gray-700 mb-4">
                <strong>Current prompt:</strong> Tell me about your most challenging project and how you solved it.
              </p>
              <div className="text-sm text-gray-600">
                Speak naturally and take your time. You can pause to think - we'll clean up the transcript later.
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <button 
                onClick={handleStopRecording}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Stop Recording
              </button>
              <button className="border border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors">
                Pause
              </button>
            </div>
          </div>
        )}

        {/* Step 3: AI Profile Creation */}
        {currentStep === 3 && (
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Creating Your AI Profile
              </h2>
              <p className="text-gray-600 mb-6">
                Our AI is processing your resume and recording to create a rich, searchable profile.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">What we're doing:</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Resume Analysis</div>
                      <div className="text-sm text-gray-600">Extracting skills, experience, and key projects</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Audio Transcription</div>
                      <div className="text-sm text-gray-600">Converting your recording to high-accuracy text</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-gray-400 text-sm font-semibold">3</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Story Integration</div>
                      <div className="text-sm text-gray-600">Combining resume and stories into rich profile</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-gray-400 text-sm font-semibold">4</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Profile Optimization</div>
                      <div className="text-sm text-gray-600">Making your profile searchable and compelling</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-3">Processing Status</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">Resume Upload</span>
                      <span className="text-sm text-green-600 font-medium">Complete</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full w-full"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">Recording</span>
                      <span className="text-sm text-green-600 font-medium">Complete</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full w-full"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">AI Processing</span>
                      <span className="text-sm text-blue-600 font-medium">In Progress...</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full w-3/4 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 justify-center mt-8">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                View My Profile
              </button>
              <button className="border border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors">
                Record Additional Session
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}