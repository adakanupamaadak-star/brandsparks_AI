import { OpenAI } from 'openai';
import { buildBrandPrompt } from '../prompts/brandPrompt';
import { calculateSEOScore } from '../seo/seoAnalyzer';

interface SEOOptions {
  keyword: string;
  targetAudience: string;
  tone: string;
  length: 'short' | 'medium' | 'long';
  brandGuidelines?: any;
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const lengthGuide = {
  short: 500,
  medium: 1200,
  long: 2000,
};

export const generateSEOContent = async (options: SEOOptions) => {
  const brandContext = buildBrandPrompt(options.brandGuidelines);

  const prompt = `
${brandContext}

Create SEO-optimized content for these requirements:
- Target Keyword: ${options.keyword}
- Target Audience: ${options.targetAudience}
- Tone: ${options.tone}
- Content Length: ~${lengthGuide[options.length]} words

Content Optimization:
1. Include keyword in title (naturally)
2. Use keyword in first 100 words
3. Include 3-5 related keywords
4. Create scannable content with subheadings
5. Include meta description (160 chars)
6. Natural language, not keyword stuffed
7. Focus on user intent
8. Include internal link opportunities

Return as JSON with keys:
- title
- metaDescription
- content
- focusKeywords (array)
- relatedKeywords (array)
- seoScore (0-100)
- structuredData (basic schema)`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const content = response.choices[0].message.content;
    const parsed = JSON.parse(content || '{}');

    const seoScore = calculateSEOScore({
      title: parsed.title,
      content: parsed.content,
      keywords: [options.keyword, ...parsed.relatedKeywords],
    });

    return {
      title: parsed.title,
      metaDescription: parsed.metaDescription,
      content: parsed.content,
      focusKeywords: [options.keyword, ...parsed.focusKeywords],
      relatedKeywords: parsed.relatedKeywords || [],
      seoScore: seoScore.score,
      structuredData: parsed.structuredData,
    };
  } catch (error) {
    throw new Error(`SEO content generation failed: ${error}`);
  }
};
