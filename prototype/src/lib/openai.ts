// Client-side API integration for candidate Q&A
export interface QueryResult {
  candidateId: string;
  candidateName: string;
  answer: string;
  relevanceScore: number;
  sourceType: 'resume' | 'transcript' | 'both';
  reasoning: string;
}

export interface QueryResponse {
  query: string;
  results: QueryResult[];
  summary: string;
  totalCandidates: number;
  processingTime: number;
}

export class CandidateQueryEngine {
  // Query knowledge bank using server-side API
  async queryKnowledgeBank(query: string): Promise<QueryResponse> {
    try {
      const response = await fetch('/api/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Query failed');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Query error:', error);
      throw new Error(`Query failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }


  // Get predefined question templates
  getQuestionTemplates() {
    return [
      {
        category: 'Technical Skills',
        questions: [
          'Who has the most experience with React and frontend development?',
          'Which candidates have built scalable backend systems?',
          'Who has experience with cloud infrastructure and DevOps?',
          'Which candidates have machine learning or AI experience?',
          'Who has mobile development experience?'
        ]
      },
      {
        category: 'Leadership & Team',
        questions: [
          'Which candidates have led technical teams?',
          'Who has experience mentoring junior developers?',
          'Which candidates have managed complex technical projects?',
          'Who has experience working with cross-functional teams?',
          'Which candidates have startup or early-stage company experience?'
        ]
      },
      {
        category: 'Problem Solving',
        questions: [
          'Who has solved complex performance optimization challenges?',
          'Which candidates have experience with system migrations?',
          'Who has dealt with high-scale technical challenges?',
          'Which candidates have experience debugging complex issues?',
          'Who has built systems from scratch?'
        ]
      },
      {
        category: 'Business Impact',
        questions: [
          'Which candidates have driven measurable business results?',
          'Who has experience with customer-facing products?',
          'Which candidates understand product development?',
          'Who has experience with growth and optimization?',
          'Which candidates have startup or entrepreneurial experience?'
        ]
      },
      {
        category: 'Culture & Collaboration',
        questions: [
          'Which candidates show passion for their work?',
          'Who has experience with remote work and collaboration?',
          'Which candidates show continuous learning and growth?',
          'Who demonstrates empathy and user focus?',
          'Which candidates show leadership potential?'
        ]
      }
    ];
  }
}

// Export singleton instance
export const candidateQueryEngine = new CandidateQueryEngine();