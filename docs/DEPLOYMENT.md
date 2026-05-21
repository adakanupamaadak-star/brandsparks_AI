# Content Generation Studio - Deployment Guide

## 🚀 Production Deployment

### Option 1: Vercel + Railway (Recommended)

#### Step 1: Deploy Frontend to Vercel

1. **Connect GitHub**
   - Go to https://vercel.com/
   - Sign in with GitHub
   - Import repository: `brandsparks_AI`

2. **Configure Build Settings**
   - Framework: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Root Directory: `./frontend`

3. **Add Environment Variables**
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app/api
   NEXT_PUBLIC_APP_NAME=Content Generation Studio
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your frontend is live!

**Frontend URL:** `https://your-app.vercel.app`

---

#### Step 2: Deploy Backend to Railway

1. **Create Railway Account**
   - Go to https://railway.app/
   - Sign in with GitHub

2. **Create New Project**
   - Click "+ New Project"
   - Select "GitHub Repo"
   - Choose `brandsparks_AI`

3. **Add PostgreSQL Database**
   - Click "+ Add Plugin"
   - Select "PostgreSQL"
   - This creates DATABASE_URL automatically

4. **Add Redis Cache (Optional)**
   - Click "+ Add Plugin"
   - Select "Redis"
   - Gets REDIS_URL

5. **Configure Backend**
   - Select "NodeJS" service
   - Set root directory: `./backend`
   - Build command: `npm install && npm run migrate && npm run build`
   - Start command: `npm start`

6. **Add Environment Variables**
   In Railway dashboard, add:
   ```
   NODE_ENV=production
   PORT=5000
   OPENAI_API_KEY=sk-...
   JWT_SECRET=your-super-secret-key
   CORS_ORIGIN=https://your-app.vercel.app
   DATABASE_URL=(auto-filled by PostgreSQL)
   REDIS_URL=(auto-filled by Redis)
   ```

7. **Deploy**
   - Railway auto-deploys on git push
   - Monitor logs in Railway dashboard
   - Get your backend URL from Railway

**Backend URL:** `https://your-backend.railway.app`

---

#### Step 3: Update Frontend with Backend URL

1. **Update Vercel Environment**
   - Go to Vercel Project Settings
   - Environment Variables
   - Update `NEXT_PUBLIC_API_URL` with Railway backend URL
   - Vercel auto-redeploys

2. **Test Connection**
   ```bash
   curl https://your-backend.railway.app/health
   ```

---

### Option 2: Heroku Deployment

#### Deploy Backend to Heroku

```bash
# Install Heroku CLI
npm i -g heroku

# Login
heroku login

# Create app
heroku create your-app-name

# Add PostgreSQL
heroku addons:create heroku-postgresql:hobby-dev

# Add Redis
heroku addons:create heroku-redis:premium-0

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set OPENAI_API_KEY=sk-...
heroku config:set JWT_SECRET=your-secret-key
heroku config:set CORS_ORIGIN=https://your-app.vercel.app

# Create Procfile in backend root:
echo "web: npm start" > Procfile

# Deploy
git push heroku main

# Run migrations
heroku run npm run migrate

# View logs
heroku logs --tail
```

---

### Option 3: Docker + AWS/DigitalOcean

#### Build Docker Images

```bash
# Build backend image
cd backend
docker build -t content-api:latest .

# Build frontend image
cd ../frontend
docker build -t content-web:latest -f Dockerfile.prod .

# Tag for registry
docker tag content-api:latest your-registry/content-api:latest
docker tag content-web:latest your-registry/content-web:latest

# Push to registry
docker push your-registry/content-api:latest
docker push your-registry/content-web:latest
```

#### Deploy to AWS ECS

1. **Create ECR Repositories**
   ```bash
   aws ecr create-repository --repository-name content-api
   aws ecr create-repository --repository-name content-web
   ```

2. **Create ECS Cluster**
   - Go to AWS ECS console
   - Create cluster: "content-studio-prod"
   - Select EC2 or Fargate

3. **Create Task Definitions**
   - Define backend service
   - Define frontend service
   - Link to RDS PostgreSQL
   - Link to ElastiCache Redis

4. **Deploy Services**
   - Create services in cluster
   - Set load balancer
   - Monitor health

---

## 🔒 Security Setup

### SSL/TLS Certificates

**Vercel**: Automatic free SSL
**Railway**: Automatic free SSL
**Heroku**: Automatic free SSL

### Environment Variables Management

✅ **Do:**
- Use platform's secret management (Vercel Secrets, Railway Vault)
- Rotate keys monthly
- Use different keys for dev/staging/prod
- Never commit .env files

❌ **Don't:**
- Store secrets in code
- Share secrets via chat/email
- Use same key across environments

### Database Security

```sql
-- Create restricted user
CREATE USER content_app WITH PASSWORD 'strong_password';
GRANT CONNECT ON DATABASE content_studio TO content_app;
GRANT USAGE ON SCHEMA public TO content_app;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO content_app;
```

### API Security

```javascript
// Rate limiting
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests'
});
app.use(limiter);

// CORS
const cors = require('cors');
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));

// Helmet for security headers
const helmet = require('helmet');
app.use(helmet());
```

---

## 📊 Monitoring & Analytics

### Error Tracking

**Setup Sentry:**

```javascript
// backend/src/index.ts
const Sentry = require('@sentry/node');

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
});

app.use(Sentry.Handlers.errorHandler());
```

**Setup in Vercel:**
```bash
npm install @sentry/nextjs
```

### Performance Monitoring

**Setup New Relic:**

```javascript
// backend/src/index.ts (first line)
require('newrelic');
```

```bash
npm install newrelic
```

### Logging

```javascript
// Use structured logging
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow

**File: `.github/workflows/deploy.yml`**

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: cd backend && npm test
      - run: cd frontend && npm test

  deploy-backend:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Railway
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}
        run: |
          npm i -g @railway/cli
          railway up --service backend

  deploy-frontend:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
        run: |
          npm i -g vercel
          vercel --prod --token=$VERCEL_TOKEN
```

---

## 📈 Scaling Strategy

### Phase 1: MVP (Current)
- Single backend instance
- Single database
- Serverless frontend
- Cost: ~$50/month

### Phase 2: Growth
- Load-balanced backend (2-3 instances)
- Read replicas for database
- CDN for frontend
- Redis caching
- Cost: ~$200/month

### Phase 3: Enterprise
- Auto-scaling backend
- Database clustering
- Multiple regions
- Advanced monitoring
- Cost: ~$1000+/month

### Database Scaling

```sql
-- Add replication
CREATE PUBLICATION content_pub FOR ALL TABLES;

-- Add read-only replica
SELECT pg_create_physical_replication_slot('replica_slot');
```

### Caching Strategy

```javascript
// Cache brand profiles for 1 hour
const CACHE_TTL = 3600;

async function getBrandProfile(userId) {
  const cached = await redis.get(`brand:${userId}`);
  if (cached) return JSON.parse(cached);
  
  const profile = await db.brand.findUnique({ where: { userId } });
  await redis.setex(`brand:${userId}`, CACHE_TTL, JSON.stringify(profile));
  return profile;
}
```

---

## 🧪 Testing Before Deployment

### Staging Environment

```bash
# Create staging branch
git checkout -b staging

# Deploy to staging first
# Test all features
# Then merge to main for production
```

### Load Testing

```bash
# Install k6
brew install k6

# Create load-test.js
export default function() {
  http.get('https://api.example.com/health');
}

# Run test
k6 run --vus 100 --duration 30s load-test.js
```

### Smoke Tests

```bash
# Test critical flows
curl https://api.example.com/health
curl https://api.example.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"Test123","name":"Test"}'
```

---

## 🔧 Maintenance

### Regular Tasks

**Weekly:**
- Check error logs
- Monitor performance metrics
- Review API usage

**Monthly:**
- Update dependencies
- Backup database
- Rotate API keys

**Quarterly:**
- Security audit
- Performance optimization
- Capacity planning

### Database Maintenance

```sql
-- Vacuum to clean dead rows
VACUUM ANALYZE;

-- Reindex for performance
REINDEX DATABASE content_studio;

-- Check table sizes
SELECT 
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename))
FROM pg_tables
WHERE schemaname != 'pg_catalog'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

---

## 📋 Deployment Checklist

- [ ] All tests passing
- [ ] Environment variables set
- [ ] Database migrations completed
- [ ] SSL certificates configured
- [ ] Monitoring setup (Sentry/New Relic)
- [ ] Logging configured
- [ ] Backups enabled
- [ ] CORS properly configured
- [ ] Rate limiting enabled
- [ ] API documentation updated
- [ ] Health check working
- [ ] Load test successful
- [ ] Smoke tests passing
- [ ] Team notified
- [ ] Rollback plan ready

---

**Estimated Deployment Time: 30-60 minutes**
