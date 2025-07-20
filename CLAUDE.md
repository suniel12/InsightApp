# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

InsightApp is an AI-native hiring platform that replaces traditional resumes with conversational voice recordings. The platform allows candidates to record project stories and enables employers to search and query candidate profiles using natural language.

### Core Architecture (Planned)
- **Frontend**: Next.js with TypeScript and Tailwind CSS
- **Backend**: FastAPI (Python) for API services
- **AI Services**: OpenAI (Whisper for transcription, GPT-4 for structuring, embeddings for search)
- **Database**: PostgreSQL for structured data, Pinecone for vector search
- **Storage**: AWS S3 for audio files
- **Infrastructure**: AWS (ECS, RDS, S3, CloudFront)

## Development Best Practices

### Code Organization
- Use feature-based directory structure
- Separate concerns: UI components, business logic, API calls, utilities
- Follow consistent naming conventions (camelCase for JavaScript/TypeScript, snake_case for Python)
- Keep functions small and focused (Single Responsibility Principle)

### AI/ML Development
- Always validate AI outputs before storing
- Implement fallback mechanisms for API failures
- Store raw transcripts alongside processed versions
- Use structured prompts with clear instructions and examples
- Monitor AI service costs and usage patterns

### Security & Data Handling
- Never commit API keys or sensitive configuration
- Implement proper data validation and sanitization
- Use environment variables for all configuration
- Encrypt sensitive data at rest and in transit
- Follow GDPR principles for data handling

### Testing Strategy
- Write unit tests for all business logic
- Test AI integration points with mock responses
- Include integration tests for critical user flows
- Test audio processing pipeline thoroughly
- Validate search accuracy with known datasets

### Performance Considerations
- Implement caching for frequently accessed data
- Use async processing for heavy operations (transcription, embedding generation)
- Optimize database queries with proper indexing
- Implement pagination for large result sets
- Monitor API response times and set appropriate timeouts

### Error Handling
- Implement comprehensive error boundaries in React components
- Use structured logging for debugging AI processing issues
- Provide meaningful error messages to users
- Implement retry logic for transient failures
- Monitor error rates and patterns

### Development Workflow
- Use TypeScript for all frontend code
- Implement pre-commit hooks for linting and formatting
- Use conventional commit messages
- Keep dependencies up to date
- Document API endpoints and data schemas

### Deployment & Infrastructure
- Use containerization for consistent environments
- Implement blue-green deployments for zero downtime
- Set up monitoring and alerting for critical services
- Use Infrastructure as Code (Terraform) for reproducible deployments
- Implement automated backups for databases

## Key Technical Decisions

### Why Voice-First Approach
- Captures authentic communication style and personality
- Reduces candidate effort compared to written applications
- Provides richer context than keyword-based matching
- Enables natural language querying by employers

### Technology Choices
- **Next.js**: Full-stack React framework with excellent developer experience
- **FastAPI**: High-performance Python framework with automatic API documentation
- **OpenAI APIs**: Industry-leading AI services for transcription and language processing
- **Pinecone**: Managed vector database optimized for similarity search
- **PostgreSQL**: Reliable relational database for structured data

## Future Considerations

### Scalability Planning
- Design for horizontal scaling from the start
- Consider microservices architecture as the platform grows
- Plan for multi-region deployment
- Implement rate limiting and quotas

### Feature Roadmap Priorities
1. Core recording and transcription pipeline
2. Basic search and query functionality
3. Employer dashboard and candidate comparison
4. Advanced AI insights and matching
5. ATS integrations and export features
6. Mobile app for candidate recordings
7. Advanced analytics and reporting

This document will be updated as the project evolves and new patterns emerge.