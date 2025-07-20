import Link from 'next/link';
import { mockCandidates } from '@/data/candidates';

export default function CandidatesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/" className="text-blue-600 hover:text-blue-700 mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Demo Candidate Profiles</h1>
          <p className="text-gray-600 text-lg">
            Explore how candidates share their experience through conversational recordings
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCandidates.map((candidate) => (
            <Link 
              key={candidate.id} 
              href={`/candidates/${candidate.id}`}
              className="block"
            >
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                    {candidate.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500 mb-1">Experience</div>
                    <div className="text-sm font-medium text-gray-700">
                      {candidate.experienceYears} years
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {candidate.name}
                </h3>
                <p className="text-gray-600 mb-3">{candidate.role}</p>
                <p className="text-sm text-gray-500 mb-4">{candidate.location}</p>

                <div className="mb-4">
                  <div className="text-xs text-gray-500 mb-2">Primary Skills</div>
                  <div className="flex flex-wrap gap-1">
                    {candidate.skills.primary.slice(0, 4).map((skill, index) => (
                      <span 
                        key={index}
                        className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-500">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                      </svg>
                      {candidate.recording.duration}
                    </div>
                    <div className="text-blue-600 font-medium">
                      View Profile →
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}