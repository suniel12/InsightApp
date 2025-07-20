# AI Hiring Platform MVP Architecture

## System Overview

The platform consists of three main components:
1. **Candidate Portal**: Voice recording and profile management
2. **Employer Dashboard**: Query interface and candidate evaluation
3. **AI Processing Pipeline**: Transcription, summarization, and Q&A engine

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                           Frontend Layer                             │
├─────────────────────────┬───────────────────────────────────────────┤
│   Candidate Portal      │         Employer Dashboard                 │
│   (Next.js + Tailwind)  │         (Next.js + Tailwind)             │
└───────────┬─────────────┴──────────────┬────────────────────────────┘
            │                            │
            ▼                            ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    API Gateway (AWS API Gateway)                     │
│                         + Auth (AWS Cognito)                         │
└───────────┬─────────────────────────────────────────────────────────┘
            │
            ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    Backend Services (FastAPI)                        │
├─────────────────────────┬───────────────────────┬───────────────────┤
│   Recording Service     │   AI Service          │  Query Service     │
│   - Upload/Stream       │   - Transcription     │  - Vector Search   │
│   - Storage Management  │   - Summarization     │  - NLP Queries     │
│   - Metadata Handling   │   - Structuring       │  - Ranking         │
└─────────────────────────┴───────────────────────┴───────────────────┘
            │                         │                      │
            ▼                         ▼                      ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         Data Layer                                   │
├──────────────────┬────────────────────┬─────────────────────────────┤
│  Object Storage  │   PostgreSQL       │   Vector Database           │
│  (AWS S3)        │   - User Data      │   (Pinecone)                │
│  - Audio Files   │   - Job Postings   │   - Embeddings              │
│  - Transcripts   │   - Metadata        │   - Semantic Search         │
└──────────────────┴────────────────────┴─────────────────────────────┘
```

## Component Details

### 1. Frontend Layer

#### Candidate Portal
```typescript
// Key Components
- RecordingInterface.tsx    // WebRTC-based voice recorder
- TranscriptEditor.tsx      // Review and edit transcriptions
- ProfilePreview.tsx        // Show employer view
- OnboardingFlow.tsx        // Guided setup process

// Key Features
- Progressive Web App for mobile recording
- Real-time recording status and feedback
- Automatic save and resume capability
- Accessibility compliance (WCAG 2.1 AA)
```

#### Employer Dashboard
```typescript
// Key Components
- QueryInterface.tsx        // Natural language search
- CandidateComparison.tsx   // Side-by-side evaluation
- InsightsPanel.tsx         // AI-generated summaries
- ATSIntegration.tsx        // Export functionality

// Key Features
- Real-time query processing
- Customizable evaluation criteria
- Bulk operations support
- Role-based access control
```

### 2. API Layer

#### API Gateway Configuration
```yaml
# API Structure
/api/v1/
  /auth/
    POST   /login
    POST   /logout
    POST   /refresh
  
  /candidates/
    POST   /recordings/upload
    GET    /recordings/{id}
    POST   /transcripts/review
    GET    /profile
  
  /employers/
    POST   /queries/execute
    GET    /candidates/list
    POST   /candidates/compare
    POST   /evaluations/save
  
  /ai/
    POST   /transcribe
    POST   /summarize
    POST   /embed
```

#### Authentication & Authorization
```python
# JWT-based authentication with role separation
{
  "sub": "user_id",
  "role": "employer|candidate",
  "org_id": "organization_id",
  "permissions": ["read", "write", "admin"],
  "exp": 1234567890
}
```

### 3. Backend Services

#### Recording Service
```python
# FastAPI endpoint example
@router.post("/recordings/upload")
async def upload_recording(
    file: UploadFile,
    metadata: RecordingMetadata,
    user: User = Depends(get_current_user)
):
    # Validate file format (WebM, MP4, WAV)
    # Stream to S3 with multipart upload
    # Create database entry
    # Trigger transcription pipeline
    return {"recording_id": recording_id, "status": "processing"}
```

#### AI Processing Pipeline
```python
# Asynchronous processing with Celery
@celery_app.task
def process_recording(recording_id: str):
    # 1. Download from S3
    audio_url = s3_client.get_url(recording_id)
    
    # 2. Transcribe with Whisper
    transcript = whisper_api.transcribe(audio_url, {
        "model": "whisper-1",
        "language": "en",
        "response_format": "verbose_json"
    })
    
    # 3. Enhance and structure with GPT-4
    structured_data = gpt4_api.complete({
        "model": "gpt-4-turbo",
        "messages": [
            {"role": "system", "content": STRUCTURING_PROMPT},
            {"role": "user", "content": transcript.text}
        ]
    })
    
    # 4. Generate embeddings
    embeddings = openai.embeddings.create(
        model="text-embedding-3-small",
        input=chunk_text(structured_data)
    )
    
    # 5. Store in vector database
    pinecone.upsert(embeddings)
    
    # 6. Update PostgreSQL
    update_candidate_profile(recording_id, structured_data)
```

#### Query Service
```python
# Natural language query processing
@router.post("/queries/execute")
async def execute_query(
    query: QueryRequest,
    user: Employer = Depends(get_current_employer)
):
    # 1. Generate query embedding
    query_embedding = generate_embedding(query.text)
    
    # 2. Vector similarity search
    candidates = pinecone.query(
        vector=query_embedding,
        top_k=query.limit or 10,
        filter={"job_id": query.job_id}
    )
    
    # 3. Rerank with cross-encoder
    reranked = cross_encoder.rerank(query.text, candidates)
    
    # 4. Generate insights
    insights = generate_candidate_insights(reranked)
    
    return {
        "candidates": reranked,
        "insights": insights,
        "query_id": save_query_history(query, user)
    }
```

### 4. Data Architecture

#### PostgreSQL Schema
```sql
-- Core tables
CREATE TABLE users (
    id UUID PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(50) NOT NULL,
    organization_id UUID,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE recordings (
    id UUID PRIMARY KEY,
    candidate_id UUID REFERENCES users(id),
    s3_url TEXT NOT NULL,
    duration_seconds INTEGER,
    transcript_status VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE candidate_profiles (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    structured_data JSONB,
    skills TEXT[],
    experience_years INTEGER,
    last_updated TIMESTAMP
);

CREATE TABLE job_postings (
    id UUID PRIMARY KEY,
    employer_id UUID REFERENCES users(id),
    title VARCHAR(255),
    requirements JSONB,
    evaluation_criteria JSONB,
    status VARCHAR(50)
);

CREATE TABLE queries (
    id UUID PRIMARY KEY,
    employer_id UUID REFERENCES users(id),
    job_id UUID REFERENCES job_postings(id),
    query_text TEXT,
    results JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);
```

#### Vector Database Configuration
```python
# Pinecone index configuration
index_config = {
    "name": "candidate-knowledge",
    "dimension": 1536,  # OpenAI embedding dimension
    "metric": "cosine",
    "pod_type": "s1.x1",
    "metadata_config": {
        "indexed": ["candidate_id", "job_id", "skill_tags"]
    }
}

# Document structure
{
    "id": "chunk_id",
    "values": [0.1, 0.2, ...],  # 1536-dim embedding
    "metadata": {
        "candidate_id": "uuid",
        "recording_id": "uuid",
        "chunk_type": "experience|skills|project",
        "text": "original text chunk",
        "timestamp": "2024-01-01T00:00:00Z"
    }
}
```

### 5. Infrastructure & DevOps

#### AWS Infrastructure
```yaml
# Terraform configuration overview
resources:
  - S3 Buckets:
      - recordings-raw (with lifecycle policies)
      - transcripts-processed
      - static-assets (CloudFront distribution)
  
  - ECS Fargate:
      - API Service (auto-scaling 2-10 instances)
      - Worker Service (Celery, 1-5 instances)
  
  - RDS PostgreSQL:
      - Multi-AZ deployment
      - Automated backups
      - Read replica for analytics
  
  - ElastiCache Redis:
      - Session management
      - Celery broker
      - API response caching
```

#### Monitoring & Observability
```yaml
# DataDog configuration
monitors:
  - API Latency (p95 < 200ms)
  - Transcription Success Rate (> 99%)
  - Query Accuracy (user feedback > 85%)
  - System Health (uptime > 99.9%)

logging:
  - Structured logs to CloudWatch
  - Error tracking with Sentry
  - User analytics with Mixpanel
```

### 6. Security & Compliance

#### Security Measures
```yaml
security:
  encryption:
    - TLS 1.3 for all API traffic
    - AES-256 for data at rest
    - KMS for key management
  
  authentication:
    - OAuth 2.0 + JWT
    - MFA for employer accounts
    - Session timeout policies
  
  authorization:
    - RBAC with fine-grained permissions
    - Resource-level access control
    - API rate limiting per tier
  
  compliance:
    - GDPR data handling
    - SOC 2 Type I preparation
    - Regular security audits
```

### 7. AI/ML Pipeline Details

#### Prompt Engineering
```python
STRUCTURING_PROMPT = """
Extract and structure the following information from the candidate's recording:

1. Technical Skills: List specific technologies, frameworks, and tools mentioned
2. Experience Level: Categorize as Junior/Mid/Senior based on project complexity
3. Key Projects: Summarize 3-5 most relevant projects with:
   - Problem solved
   - Technologies used
   - Impact/Results
   - Team size and role
4. Communication Style: Note clarity, technical depth, and enthusiasm
5. Red Flags: Any concerns or inconsistencies

Output as structured JSON following this schema:
{
  "skills": {"primary": [], "secondary": []},
  "experience_level": "junior|mid|senior",
  "projects": [{...}],
  "communication_score": 1-10,
  "highlights": [],
  "concerns": []
}
"""
```

#### Feedback Loop Implementation
```python
# Continuous improvement system
@router.post("/feedback/submit")
async def submit_feedback(
    feedback: FeedbackRequest,
    user: User = Depends(get_current_user)
):
    # Store feedback
    await store_feedback(feedback)
    
    # Retrain relevance model if threshold met
    if await should_retrain():
        trigger_model_retraining.delay()
    
    # Update prompt templates
    if feedback.type == "incorrect_summary":
        await update_prompt_performance(
            feedback.prompt_version,
            feedback.accuracy_score
        )
```

### 8. Scalability Considerations

#### Performance Optimization
- **Caching Strategy**: Redis for frequently accessed data
- **CDN**: CloudFront for static assets and recordings
- **Database Indexing**: Optimized for common query patterns
- **Async Processing**: All heavy operations off main thread

#### Scaling Triggers
```yaml
scaling_policies:
  api_service:
    target_cpu: 70%
    target_memory: 80%
    scale_out_cooldown: 60s
    scale_in_cooldown: 300s
  
  worker_service:
    queue_depth_threshold: 100
    processing_time_target: 300s
```

### 9. Development Workflow

#### CI/CD Pipeline
```yaml
# GitHub Actions workflow
steps:
  - Unit Tests (pytest, Jest)
  - Integration Tests (Cypress)
  - Security Scan (Snyk)
  - Build & Push Images
  - Deploy to Staging
  - Run E2E Tests
  - Deploy to Production (manual approval)
```

#### Environment Configuration
```bash
# Environment variables
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
OPENAI_API_KEY=sk-...
PINECONE_API_KEY=...
AWS_REGION=us-west-2
SENTRY_DSN=...
```

## Cost Estimation (Monthly)

| Service | Usage | Cost |
|---------|-------|------|
| AWS Infrastructure | ECS, RDS, S3, etc. | $500-800 |
| OpenAI APIs | ~10K transcriptions | $300-500 |
| Pinecone | Starter plan | $70 |
| Monitoring (DataDog) | Basic plan | $150 |
| **Total** | | **$1,020-1,520** |

## MVP Timeline Implementation

- **Week 1-2**: Core infrastructure setup
- **Week 3-4**: Recording and transcription pipeline
- **Week 5-6**: Query engine and employer dashboard
- **Week 7-8**: Integration testing and security hardening
- **Week 9-10**: Pilot deployment with design partners
- **Week 11-12**: Performance optimization and scaling prep