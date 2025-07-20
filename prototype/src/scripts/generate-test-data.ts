/**
 * Test data generation utility for InsightApp prototype
 * This script helps generate and manage test data for resume and transcript testing
 */

import { testResumes, TestResume } from '../data/test-resumes';
import { testTranscriptions, TestTranscription } from '../data/test-transcriptions';

export interface TestDataPair {
  resume: TestResume;
  transcription: TestTranscription;
}

export class TestDataGenerator {
  /**
   * Get all test data pairs (resume + transcription)
   */
  getAllTestPairs(): TestDataPair[] {
    return testResumes.map(resume => {
      const transcription = testTranscriptions.find(t => t.resumeId === resume.id);
      if (!transcription) {
        throw new Error(`No transcription found for resume: ${resume.id}`);
      }
      return { resume, transcription };
    });
  }

  /**
   * Get test data by candidate name
   */
  getTestPairByName(candidateName: string): TestDataPair | null {
    const resume = testResumes.find(r => r.candidateName === candidateName);
    if (!resume) return null;

    const transcription = testTranscriptions.find(t => t.resumeId === resume.id);
    if (!transcription) return null;

    return { resume, transcription };
  }

  /**
   * Generate a specific number of random test pairs
   */
  getRandomTestPairs(count: number): TestDataPair[] {
    const allPairs = this.getAllTestPairs();
    const shuffled = [...allPairs].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, allPairs.length));
  }

  /**
   * Get test pairs filtered by resume format
   */
  getTestPairsByFormat(format: TestResume['format']): TestDataPair[] {
    return this.getAllTestPairs().filter(pair => pair.resume.format === format);
  }

  /**
   * Generate test data summary statistics
   */
  getTestDataStats() {
    const allPairs = this.getAllTestPairs();
    
    const formatCounts = allPairs.reduce((acc, pair) => {
      acc[pair.resume.format] = (acc[pair.resume.format] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const avgTranscriptLength = allPairs.reduce((sum, pair) => 
      sum + pair.transcription.transcript.length, 0) / allPairs.length;

    const avgResumeLength = allPairs.reduce((sum, pair) => 
      sum + pair.resume.resumeText.length, 0) / allPairs.length;

    return {
      totalPairs: allPairs.length,
      formatDistribution: formatCounts,
      averageTranscriptLength: Math.round(avgTranscriptLength),
      averageResumeLength: Math.round(avgResumeLength),
      candidateRoles: allPairs.map(p => p.resume.candidateName.split(' ')[1]).slice(0, 5),
      totalKeyTopics: allPairs.reduce((sum, pair) => sum + pair.transcription.keyTopics.length, 0)
    };
  }

  /**
   * Simulate AI processing results for a test pair
   */
  simulateAIProcessing(pair: TestDataPair) {
    const { resume, transcription } = pair;
    
    // Extract skills from resume text
    const skillKeywords = ['React', 'Python', 'JavaScript', 'AWS', 'Node.js', 'Docker', 'SQL', 'TypeScript'];
    const extractedSkills = skillKeywords.filter(skill => 
      resume.resumeText.toLowerCase().includes(skill.toLowerCase())
    );

    // Generate AI insights
    const insights = {
      extractedSkills,
      experienceLevel: this.classifyExperienceLevel(resume.resumeText),
      keyProjects: this.extractProjects(resume.resumeText),
      technicalDepth: this.assessTechnicalDepth(transcription.transcript),
      culturalFit: this.assessCulturalFit(transcription.transcript),
      strongSuits: transcription.keyTopics.slice(0, 3),
      potentialConcerns: this.identifyPotentialConcerns(transcription.transcript)
    };

    return {
      candidateName: resume.candidateName,
      processingTime: `${Math.floor(Math.random() * 120) + 30}s`,
      confidence: Math.floor(Math.random() * 20) + 80,
      insights
    };
  }

  private classifyExperienceLevel(resumeText: string): string {
    const yearMatches = resumeText.match(/(\d+)\+?\s*years?/gi);
    if (yearMatches) {
      const years = Math.max(...yearMatches.map(m => parseInt(m.match(/\d+/)![0])));
      if (years < 3) return 'Junior';
      if (years < 6) return 'Mid-level';
      return 'Senior';
    }
    return 'Mid-level';
  }

  private extractProjects(resumeText: string): string[] {
    const projectKeywords = ['platform', 'system', 'application', 'dashboard', 'API', 'migration', 'optimization'];
    return projectKeywords.filter(keyword => 
      resumeText.toLowerCase().includes(keyword)
    ).slice(0, 3);
  }


  private assessTechnicalDepth(transcript: string): number {
    const technicalTerms = ['architecture', 'optimization', 'performance', 'scalability', 'algorithm', 'framework'];
    const mentions = technicalTerms.reduce((count, term) => 
      count + (transcript.toLowerCase().match(new RegExp(term, 'g')) || []).length, 0
    );
    return Math.min(10, Math.floor(mentions / 2) + 6);
  }

  private assessCulturalFit(transcript: string): string[] {
    const traits = [];
    if (transcript.includes('team') || transcript.includes('collaboration')) traits.push('Team-oriented');
    if (transcript.includes('mentor') || transcript.includes('help')) traits.push('Mentoring mindset');
    if (transcript.includes('learning') || transcript.includes('growth')) traits.push('Growth-focused');
    if (transcript.includes('challenge') || transcript.includes('problem')) traits.push('Problem solver');
    if (transcript.includes('user') || transcript.includes('customer')) traits.push('User-centric');
    return traits.slice(0, 3);
  }

  private identifyPotentialConcerns(transcript: string): string[] {
    const concerns = [];
    if (transcript.length < 3000) concerns.push('Brief responses - may need more detail');
    if (!transcript.includes('team')) concerns.push('Limited discussion of teamwork');
    if (!transcript.includes('challenge')) concerns.push('Few specific challenges mentioned');
    return concerns.slice(0, 2);
  }

  /**
   * Export test data to different formats
   */
  exportToJSON(): string {
    return JSON.stringify(this.getAllTestPairs(), null, 2);
  }

  exportToCSV(): string {
    const pairs = this.getAllTestPairs();
    const headers = ['candidateName', 'resumeFormat', 'transcriptDuration', 'resumeLength', 'transcriptLength', 'keyTopics'];
    
    const rows = pairs.map(pair => [
      pair.resume.candidateName,
      pair.resume.format,
      pair.transcription.duration,
      pair.resume.resumeText.length,
      pair.transcription.transcript.length,
      pair.transcription.keyTopics.join('; ')
    ]);

    return [headers, ...rows].map(row => row.join(',')).join('\n');
  }

  /**
   * Validate test data consistency
   */
  validateTestData(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Check that every resume has a matching transcription
    for (const resume of testResumes) {
      const transcription = testTranscriptions.find(t => t.resumeId === resume.id);
      if (!transcription) {
        errors.push(`No transcription found for resume: ${resume.id}`);
      } else if (transcription.candidateName !== resume.candidateName) {
        errors.push(`Name mismatch: ${resume.candidateName} vs ${transcription.candidateName}`);
      }
    }

    // Check for duplicate IDs
    const resumeIds = testResumes.map(r => r.id);
    const transcriptionIds = testTranscriptions.map(t => t.id);
    const duplicateResumeIds = resumeIds.filter((id, index) => resumeIds.indexOf(id) !== index);
    const duplicateTranscriptionIds = transcriptionIds.filter((id, index) => transcriptionIds.indexOf(id) !== index);

    if (duplicateResumeIds.length > 0) {
      errors.push(`Duplicate resume IDs: ${duplicateResumeIds.join(', ')}`);
    }
    if (duplicateTranscriptionIds.length > 0) {
      errors.push(`Duplicate transcription IDs: ${duplicateTranscriptionIds.join(', ')}`);
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

// Export singleton instance
export const testDataGenerator = new TestDataGenerator();

// Usage examples:
/*
// Get all test data
const allPairs = testDataGenerator.getAllTestPairs();

// Get random test pairs
const randomPairs = testDataGenerator.getRandomTestPairs(3);

// Get specific candidate
const sarahData = testDataGenerator.getTestPairByName('Sarah Chen');

// Get statistics
const stats = testDataGenerator.getTestDataStats();

// Simulate AI processing
const aiResults = testDataGenerator.simulateAIProcessing(sarahData!);

// Export data
const jsonData = testDataGenerator.exportToJSON();
const csvData = testDataGenerator.exportToCSV();

// Validate data
const validation = testDataGenerator.validateTestData();
*/