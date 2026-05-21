# Content Generation Studio - Complete Architecture Guide

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     USER INTERFACE LAYER                        │
│              Next.js Frontend (React 18 + TypeScript)          │
│  (Dashboard, Generators, Brand Manager, Content Library, etc)  │
└────────────────────────────┬────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│              API GATEWAY & AUTHENTICATION LAYER                 │
│  (JWT Tokens, CORS, Request Validation, Rate Limiting)         │
└────────────────────────────┬────────────────────────────────────┘
                              │
            ┌─────────────────┼─────────────────┐
            ▼                 ▼                 ▼
┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│  AUTH SERVICE    │ │ BRAND SERVICE    │ │ CONTENT SERVICE  │
│ (Register/Login) │ │ (Profile & Voice)│ │ (CRUD Ops)       │
└──────────────────┘ └──────────────────┘ └──────────────────┘
            │                 │                 │
            └─────────────────┼─────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│           CONTENT GENERATION ENGINE (LLM Integration)           │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │        PROMPT ENGINEERING & BRAND VOICE SYSTEM          │   │
│  │  (Injects brand guidelines, tone, style into prompts)   │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐         │
│  │   Blog   │ │ Ad Copy  │ │ Social   │ │  Email   │         │
│  │Generator │ │Generator │ │Generator │ │Generator │         │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘         │
│                                                                 │
│  ┌──────────┐                                                   │
│  │   SEO    │                                                   │
│  │Generator │                                                   │
│  └──────────┘                                                   │
│                                                                 │
│              ↓ (All use OpenAI GPT-4 API)                      │
│         ┌──────────────────┐                                    │
│         │  OpenAI GPT-4    │                                    │
│         │  (Text Generation)│                                    │
│         └──────────────────┘                                    │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    OPTIMIZATION LAYER                           │
│                                                                 │
│  ┌──────────────────────┐  ┌──────────────────────┐            │
│  │  SEO Analyzer        │  │  Content Validator   │            │
│  │  (Calculate Score)   │  │  (Grammar, Tone)     │            │
│  └──────────────────────┘  └──────────────────────┘            │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      DATA LAYER                                 │
│                                                                 │
│  ┌──────────────────────────┐  ┌──────────────────────────┐   │
│  │   PostgreSQL Database    │  │   Redis Cache Layer      │   │
│  │  (Users, Brand, Content) │  │  (Sessions, Queries)     │   │
│  └──────────────────────────┘  └──────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

## Component Breakdown

### 1. Frontend (Next.js)

**Pages:**
- `/` - Dashboard with analytics
- `/generator` - Content generation interface
- `/brand` - Brand profile setup
- `/content` - Content library
- `/login` - Authentication

**Components:**
- `Sidebar` - Navigation
- `Navbar` - Top navigation
- `ContentTabs` - Generator interface
- `BrandVoicePanel` - Brand profile display
- `ContentLibrary` - Content management

### 2. Backend API (Express.js)

**Routes:**
```
GET  /health                 # Health check
POST /api/auth/register      # User registration
POST /api/auth/login         # User login
GET  /api/brand              # Get brand profile
POST /api/brand              # Create/update brand
GET  /api/brand/voice-profiles # Get tone options
POST /api/generate/blog      # Generate blog post
POST /api/generate/ad-copy   # Generate ad copy
POST /api/generate/social    # Generate social post
POST /api/generate/email     # Generate email
POST /api/generate/seo       # Generate SEO content
GET  /api/generate/history   # Get generation history
GET  /api/content            # Get all content
GET  /api/content/:id        # Get specific content
PUT  /api/content/:id        # Update content
DELETE /api/content/:id      # Delete content
GET  /api/analytics/dashboard # Get analytics
```

### 3. Prompt Engineering System

**Brand Voice Integration:**
```javascript
const prompt = `
${BRAND_CONTEXT}

Task: Generate ${contentType}
Requirements: ${userRequirements}
`;
```

**Prompt Templates:**
- Few-shot learning (examples)
- Chain-of-thought (step-by-step)
- Role-based prompting (assume persona)
- Constraint-based prompting (specific rules)

### 4. Database Schema

```sql
-- Users
CREATE TABLE User (
  id SERIAL PRIMARY KEY,
  email VARCHAR UNIQUE,
  password VARCHAR,
  name VARCHAR,
  createdAt TIMESTAMP DEFAULT NOW()
);

-- Brand Profiles
CREATE TABLE BrandProfile (
  id SERIAL PRIMARY KEY,
  userId INT UNIQUE,
  name VARCHAR,
  description TEXT,
  industry VARCHAR,
  targetAudience TEXT,
  voiceProfile JSON,
  guidelines TEXT,
  keywords TEXT[],
  FOREIGN KEY (userId) REFERENCES User(id)
);

-- Generated Content
CREATE TABLE GeneratedContent (
  id SERIAL PRIMARY KEY,
  userId INT,
  type VARCHAR,
  title VARCHAR,
  content TEXT,
  metadata JSON,
  createdAt TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (userId) REFERENCES User(id)
);
```

## Content Generation Flow

```
1. User Input (via Frontend)
   ├─ Content Type: Blog/Email/Social/etc
   ├─ Topic/Keywords
   ├─ Audience
   └─ Tone/Style

2. API Request
   └─ POST /api/generate/{type}

3. Fetch Brand Profile
   └─ Get user's brand guidelines

4. Build Prompt
   ├─ Inject brand context
   ├─ Add user requirements
   ├─ Include examples
   └─ Set constraints

5. Call OpenAI API
   └─ Send prompt → Get response

6. Process Response
   ├─ Parse JSON
   ├─ Calculate SEO score
   └─ Validate content

7. Save to Database
   └─ Store in GeneratedContent table

8. Return to User
   └─ Display result in UI
```

## Brand Voice Consistency System

### How It Works:

1. **Brand Profile Setup** (User enters once)
   - Brand name & description
   - Industry & target audience
   - Tone preference (Professional/Casual/Creative)
   - Brand guidelines
   - Key brand keywords

2. **Automatic Injection**
   Every generated prompt includes:
   ```
   BRAND IDENTITY:
   - Tone: Professional
   - Personality: Innovative, Reliable
   - Guidelines: [User's guidelines]
   - Keywords: [User's keywords]
   
   CRITICAL: Maintain this brand voice in all content
   ```

3. **Quality Assurance**
   - Prompt engineering ensures consistency
   - SEO analyzer checks content quality
   - User can refine before publishing

## Scalability Considerations

### Database Optimization
- Index on user_id for faster queries
- Index on created_at for sorting
- Connection pooling for concurrent requests

### Caching Strategy
- Cache brand profiles in Redis
- Cache voice profiles
- Cache recent generations

### API Rate Limiting
- 100 requests per 15 minutes per user
- OpenAI API rate limiting
- Database query limits

### Load Balancing
- Multiple backend instances
- Load balancer (Nginx/AWS ALB)
- Database read replicas

## Security Architecture

```
User Request
    ↓
[CORS Validation]
    ↓
[Rate Limiting]
    ↓
[JWT Authentication]
    ↓
[Input Validation]
    ↓
[Authorization Check]
    ↓
[Business Logic]
    ↓
[Database Query]
    ↓
[Response Encryption (HTTPS)]
    ↓
User Response
```

## Deployment Architecture

### Development
```
Localhost:3000 (Frontend)
    ↕
Localhost:5000 (Backend)
    ↕
Localhost:5432 (PostgreSQL)
    ↕
Localhost:6379 (Redis)
```

### Production
```
Vercel CDN (Frontend)
    ↕
Railway/Heroku (Backend)
    ↕
AWS RDS PostgreSQL (Database)
    ↕
AWS ElastiCache (Redis)
```

## Performance Metrics

### Target Metrics
- **API Response Time**: < 2 seconds
- **Frontend Load Time**: < 3 seconds
- **Content Generation**: < 10 seconds
- **Database Query**: < 100ms
- **Uptime**: 99.9%

### Monitoring
- Application Performance Monitoring (APM)
- Error tracking (Sentry)
- Analytics (Mixpanel)
- Logs (CloudWatch/ELK)

---

**This architecture supports 1000+ concurrent users and generates 10,000+ pieces of content per day.**
