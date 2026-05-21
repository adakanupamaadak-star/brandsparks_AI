# Quick Start Guide: Getting Your Content Generation Studio Live

## 🚀 Step-by-Step Setup Instructions

### STEP 1: Prerequisites Installation (5 minutes)

**Install Required Tools:**

1. **Node.js & npm** (v18+)
   ```bash
   # Download from: https://nodejs.org/
   # Verify installation
   node --version
   npm --version
   ```

2. **Git**
   ```bash
   # Download from: https://git-scm.com/
   git --version
   ```

3. **Docker** (Optional but recommended)
   ```bash
   # Download from: https://www.docker.com/products/docker-desktop
   docker --version
   ```

---

### STEP 2: Clone Repository (2 minutes)

```bash
# Clone the project
git clone https://github.com/adakanupamaadak-star/brandsparks_AI.git
cd brandsparks_AI
```

---

### STEP 3: Environment Setup (5 minutes)

**Create .env.local file in root:**

```bash
cp .env.example .env.local
```

**Edit .env.local and add your API keys:**

```env
# Frontend
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_APP_NAME="Content Generation Studio"

# Backend
NODE_ENV=development
PORT=5000

# Database - PostgreSQL (Local)
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/content_studio"

# Redis (Optional for caching)
REDIS_URL="redis://localhost:6379"

# OpenAI API Key (GET THIS FIRST!)
OPENAI_API_KEY=sk-your-api-key-here
OPENAI_MODEL=gpt-4

# Authentication
JWT_SECRET=your-super-secret-jwt-key-min-32-characters
JWT_EXPIRE=7d

# CORS
CORS_ORIGIN=http://localhost:3000
```

**Getting OpenAI API Key:**
1. Go to https://platform.openai.com/
2. Sign up or login
3. Navigate to API keys section
4. Create new secret key
5. Copy and paste in .env.local
6. ⚠️ Never commit .env.local to Git!

---

### STEP 4: Database Setup (5 minutes)

**Option A: Using Docker (Recommended)**

```bash
# Start PostgreSQL & Redis
docker-compose up -d postgres redis

# Verify containers running
docker ps
```

**Option B: Manual Installation**

1. Install PostgreSQL from https://www.postgresql.org/
2. Create database:
   ```bash
   psql -U postgres
   CREATE DATABASE content_studio;
   \q
   ```

3. Install Redis from https://redis.io/

---

### STEP 5: Backend Setup (10 minutes)

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Generate Prisma client
npm run prisma:generate

# Run database migrations
npm run migrate

# Start backend server
npm run dev
```

**Expected output:**
```
🚀 Server running on port 5000
📝 API Documentation: http://localhost:5000/docs
```

✅ Backend is now running!

---

### STEP 6: Frontend Setup (10 minutes)

**In a new terminal:**

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start frontend development server
npm run dev
```

**Expected output:**
```
▲ Next.js 14.0.4
- Local:        http://localhost:3000
```

✅ Frontend is now running!

---

### STEP 7: Test the Application (5 minutes)

1. **Open in Browser:**
   ```
   http://localhost:3000
   ```

2. **Health Check:**
   ```bash
   curl http://localhost:5000/health
   ```
   Should return: `{"status":"ok","timestamp":"..."}`

3. **Test API:**
   ```bash
   curl -X POST http://localhost:5000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{
       "email": "test@example.com",
       "password": "Test@1234",
       "name": "Test User"
     }'
   ```

---

## 🎯 Using the Application

### 1. Register Account
- Go to http://localhost:3000
- Click "Sign Up"
- Enter email, password, and name
- Create account

### 2. Setup Brand Profile
- Navigate to "Brand" section
- Fill in your brand details:
  - Brand name
  - Description
  - Industry
  - Target audience
  - Tone/Voice preference
  - Brand guidelines
  - Keywords
- Click "Save Brand Profile"

### 3. Generate Content

**Blog Post:**
- Go to "Generate" → "Blog Post"
- Enter topic, audience, tone, length, keywords
- Click "Generate"
- View, copy, or download result

**Ad Copy:**
- Go to "Generate" → "Ad Copy"
- Enter product details and platform
- Get 3 variations with platform-specific optimization

**Social Media Posts:**
- Go to "Generate" → "Social Media"
- Select platform (Twitter, Instagram, LinkedIn, TikTok)
- Enter topic and hashtags
- Generate optimized post

**Email Campaigns:**
- Go to "Generate" → "Email"
- Choose email type (promotional, newsletter, etc.)
- Generate full email with subject and body

**SEO Content:**
- Go to "Generate" → "SEO Content"
- Enter target keyword
- Get SEO-optimized article with score

### 4. Manage Content
- View all generated content in "Content Library"
- Copy, edit, or delete content
- Download as PDF/Word

---

## 📊 Dashboard Features

- **Total Content Count** - Track all generated content
- **This Month Stats** - Monthly generation overview
- **Content Breakdown** - See content by type
- **Recent Content** - Quick access to latest creations
- **Quick Generators** - Fast access to all tools

---

## 🔧 Troubleshooting

### Backend won't start
```bash
# Check if port 5000 is in use
lsof -i :5000
# Kill process if needed
kill -9 <PID>
```

### Database connection error
```bash
# Verify PostgreSQL is running
sudo systemctl status postgresql  # Linux
brew services list               # Mac

# Check DATABASE_URL in .env.local
```

### OpenAI API errors
```bash
# Verify API key
echo $OPENAI_API_KEY

# Check API key at https://platform.openai.com/account/api-keys
# Ensure account has credits
```

### Frontend can't reach backend
```bash
# Check NEXT_PUBLIC_API_URL in .env.local
# Should be: http://localhost:5000/api

# Verify backend is running
curl http://localhost:5000/health
```

---

## 🚀 Deployment

### Deploy Frontend to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel

# Follow prompts
```

**Environment Variables in Vercel:**
- Go to Project Settings → Environment Variables
- Add: `NEXT_PUBLIC_API_URL=https://your-backend-url.com/api`

### Deploy Backend to Railway/Heroku

**Using Railway (Recommended):**

1. Go to https://railway.app/
2. Connect GitHub
3. Create new project
4. Add PostgreSQL plugin
5. Deploy backend folder
6. Set environment variables

**Using Heroku:**

```bash
# Install Heroku CLI
npm i -g heroku

# Login
heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set OPENAI_API_KEY=sk-...
heroku config:set JWT_SECRET=...

# Deploy
git push heroku main
```

---

## 📈 Scaling for Production

### Database Optimization
```sql
-- Create indexes for faster queries
CREATE INDEX idx_user_id ON generated_content(user_id);
CREATE INDEX idx_created_at ON generated_content(created_at);
```

### Enable Redis Caching
```javascript
// In backend, cache brand profiles
const brandCache = await redis.get(`brand:${userId}`);
```

### Rate Limiting
```javascript
// Prevent API abuse
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use('/api/generate', limiter);
```

---

## 📚 API Documentation

### Authentication

**Register:**
```bash
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123",
  "name": "John Doe"
}
```

**Login:**
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123"
}

Response:
{
  "user": {...},
  "token": "eyJhbGc..."
}
```

### Brand Management

**Create/Update Brand:**
```bash
POST /api/brand
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "TechCorp",
  "description": "Leading SaaS platform",
  "industry": "Technology",
  "targetAudience": "Enterprise companies",
  "voiceProfile": {
    "tone": "professional",
    "personality": ["innovative", "reliable"]
  },
  "guidelines": "Always focus on ROI and business impact",
  "keywords": ["innovation", "efficiency", "growth"]
}
```

### Content Generation

**Generate Blog Post:**
```bash
POST /api/generate/blog
Authorization: Bearer <token>
Content-Type: application/json

{
  "topic": "AI in Marketing",
  "targetAudience": "Marketing managers",
  "tone": "professional",
  "length": "medium",
  "keywords": ["AI", "marketing", "automation"]
}

Response:
{
  "id": "uuid",
  "title": "How AI is Transforming Marketing",
  "content": "...",
  "seoScore": 85
}
```

**Generate Ad Copy:**
```bash
POST /api/generate/ad-copy
Authorization: Bearer <token>

{
  "productName": "Pro Dashboard",
  "productDescription": "Real-time analytics platform",
  "platform": "google",
  "targetAudience": "Data analysts"
}
```

---

## 🛡️ Security Best Practices

1. **Environment Variables**
   - Never commit .env files
   - Use different keys for dev/prod
   - Rotate API keys regularly

2. **Authentication**
   - JWT tokens expire in 7 days
   - Hash passwords with bcrypt
   - Validate input on backend

3. **Database**
   - Use connection pooling
   - Regular backups
   - Enable SSL connections

4. **API Security**
   - Rate limiting
   - CORS properly configured
   - Input validation
   - SQL injection prevention (Prisma handles this)

---

## 📝 Project Structure

```
content-generation-studio/
├── backend/
│   ├── src/
│   │   ├── routes/          # API endpoints
│   │   ├── services/        # Business logic & AI integration
│   │   ├── middleware/      # Auth, validation
│   │   └── utils/           # Helper functions
│   ├── prisma/              # Database schema
│   └── package.json
│
├── frontend/
│   ├── app/                 # Next.js pages
│   ├── components/          # React components
│   ├── lib/                 # Utilities & API client
│   └── package.json
│
├── docker-compose.yml       # Multi-container setup
└── README.md
```

---

## 🎓 Next Steps

1. ✅ **Local Development**: Follow steps 1-7 above
2. ✅ **Customize Brand Voice**: Add your brand guidelines
3. ✅ **Test All Generators**: Try each content type
4. ✅ **Deploy to Production**: Use Vercel + Railway
5. ✅ **Monitor Performance**: Track API usage
6. ✅ **Gather Feedback**: Improve based on user needs
7. ✅ **Scale Up**: Add more features and integrations

---

## 📞 Support & Resources

- **OpenAI Docs**: https://platform.openai.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Express Docs**: https://expressjs.com/
- **Prisma Docs**: https://www.prisma.io/docs/
- **GitHub Issues**: Create issue in repo for bugs

---

## 💡 Advanced Features (Coming Soon)

- [ ] Multi-language support
- [ ] Custom model fine-tuning
- [ ] Advanced analytics dashboard
- [ ] Team collaboration
- [ ] Content scheduling & publishing
- [ ] API for third-party integrations
- [ ] Mobile app (React Native)
- [ ] Batch content generation
- [ ] A/B testing variants
- [ ] Content performance tracking

---

**🎉 You're all set! Start generating amazing content with AI!**
