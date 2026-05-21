#!/bin/bash

# Content Generation Studio - Local Development Setup
# This script automates the setup process

set -e

echo "🚀 Content Generation Studio - Setup Script"
echo "============================================="
echo ""

# Check prerequisites
echo "📋 Checking prerequisites..."

if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js 18+"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ npm not found. Please install npm"
    exit 1
fi

if ! command -v git &> /dev/null; then
    echo "❌ Git not found. Please install Git"
    exit 1
fi

echo "✅ Prerequisites check passed"
echo ""

# Clone repository
echo "📦 Setting up repository..."
if [ ! -d "brandsparks_AI" ]; then
    git clone https://github.com/adakanupamaadak-star/brandsparks_AI.git
    cd brandsparks_AI
else
    cd brandsparks_AI
    git pull origin main
fi
echo "✅ Repository ready"
echo ""

# Environment setup
echo "🔐 Setting up environment variables..."
if [ ! -f ".env.local" ]; then
    cp .env.example .env.local
    echo "⚠️  Created .env.local - Please edit and add your OPENAI_API_KEY"
    echo "   Visit: https://platform.openai.com/api-keys"
else
    echo "✅ .env.local already exists"
fi
echo ""

# Database setup
echo "🗄️  Setting up database..."
if command -v docker &> /dev/null; then
    echo "📦 Using Docker for database..."
    docker-compose up -d postgres redis
    echo "✅ PostgreSQL and Redis started"
    sleep 5
else
    echo "⚠️  Docker not found. Please ensure PostgreSQL and Redis are running manually"
fi
echo ""

# Backend setup
echo "⚙️  Setting up backend..."
cd backend

echo "📥 Installing dependencies..."
npm install

echo "🔧 Generating Prisma client..."
npm run prisma:generate

echo "📊 Running migrations..."
npm run migrate

echo "✅ Backend setup complete"
echo ""

cd ..

# Frontend setup
echo "🎨 Setting up frontend..."
cd frontend

echo "📥 Installing dependencies..."
npm install

echo "✅ Frontend setup complete"
echo ""

cd ..

# Final instructions
echo "============================================="
echo "✨ Setup Complete!"
echo "============================================="
echo ""
echo "📝 Next steps:"
echo ""
echo "1. Edit .env.local with your OPENAI_API_KEY"
echo ""
echo "2. Start backend (in terminal 1):"
echo "   cd backend"
echo "   npm run dev"
echo ""
echo "3. Start frontend (in terminal 2):"
echo "   cd frontend"
echo "   npm run dev"
echo ""
echo "4. Open http://localhost:3000 in your browser"
echo ""
echo "5. Register a new account and start generating content!"
echo ""
echo "📚 For more help, see: QUICKSTART.md"
echo ""
