#!/bin/bash

# Windows Setup Script
# Run this in Git Bash or PowerShell

echo "🚀 Content Generation Studio - Windows Setup"
echo "============================================="
echo ""

# Check prerequisites
echo "📋 Checking prerequisites..."

if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Download from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js found: $(node --version)"
echo "✅ npm found: $(npm --version)"
echo ""

# Clone repository
echo "📦 Cloning repository..."
git clone https://github.com/adakanupamaadak-star/brandsparks_AI.git
cd brandsparks_AI
echo "✅ Repository cloned"
echo ""

# Environment setup
echo "🔐 Setting up environment variables..."
copy .env.example .env.local
echo "⚠️  .env.local created - Edit with your OPENAI_API_KEY"
echo ""

# Backend setup
echo "⚙️  Installing backend dependencies..."
cd backend
call npm install
call npm run prisma:generate
call npm run migrate
cd ..
echo "✅ Backend ready"
echo ""

# Frontend setup
echo "🎨 Installing frontend dependencies..."
cd frontend
call npm install
cd ..
echo "✅ Frontend ready"
echo ""

echo "============================================="
echo "✨ Setup Complete!"
echo "============================================="
echo ""
echo "Next steps:"
echo "1. Make sure PostgreSQL and Redis are running"
echo "2. Edit .env.local with OPENAI_API_KEY"
echo "3. Open two terminals:"
echo "   Terminal 1: cd backend && npm run dev"
echo "   Terminal 2: cd frontend && npm run dev"
echo "4. Visit http://localhost:3000"
echo ""
