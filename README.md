# BrandSparks AI

## AI-Powered Marketing Content Generation Platform

Generate high-quality marketing content in seconds using advanced AI and prompt engineering.

### Features

- 🤖 AI-powered content generation
- 📝 Multiple content types (Blog, Instagram, LinkedIn, Email, Ads)
- 🎨 5 tone options (Professional, Friendly, Luxury, Motivational, Conversational)
- 🔍 SEO optimization
- 📱 Fully responsive design
- ⚡ Real-time content generation

### Tech Stack

- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **Backend**: Next.js API Routes
- **Styling**: Tailwind CSS
- **Language**: JavaScript/JSX

### Getting Started

#### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

#### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/adakanupamaadak-star/brandsparks_AI.git
   cd brandsparks_AI
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Deployment

#### Deploy to Vercel (Recommended)

1. Visit [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Click "Deploy"

#### Deploy to Netlify

1. Connect your GitHub repository
2. Build command: `npm run build`
3. Publish directory: `.next`

#### Deploy to Railway or Render

1. Connect GitHub repository
2. Auto-detect Next.js
3. Deploy

### Environment Variables

Create a `.env.local` file:

```bash
# For OpenAI integration (optional)
OPENAI_API_KEY=your_api_key_here
```

### API Integration

To use real OpenAI API:

1. Get API key: [openai.com/api-keys](https://platform.openai.com/api-keys)
2. Add to `.env.local`
3. Update `app/api/generate/route.js`

### Usage

1. Fill in brand details (name, industry, target audience, tone)
2. Select content type and add topic, keywords, and requirements
3. Click "Generate AI Content"
4. Copy and use the generated content

### Project Structure

```
brandsparks_AI/
├── app/
│   ├── components/
│   │   └── AIContentStudio.jsx
│   ├── api/
│   │   └── generate/
│   │       └── route.js
│   ├── layout.js
│   ├── page.js
│   ├── globals.css
├── public/
├── package.json
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### License

MIT License - feel free to use this project for any purpose.

### Support

For issues or questions, please open a GitHub issue.

### Author

Created with ❤️ using AI and Prompt Engineering
