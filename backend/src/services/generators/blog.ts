import { OpenAI } from 'openai';
import { buildBrandPrompt } from '../prompts/brandPrompt';
import { calculateSEOScore } from '../seo/seoAnalyzer';

interface BlogOptions {
  topic: string;
  targetAudience: string;
  tone: string;
  length: 'short' | 'medium' | 'long';
  keywords: string[];
  brandGuidelines?: any;
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const lengthGuide = {
  short: 500,
  medium: 1500,
  long: 3000,
};

export const generateBlogPost = async (options: BlogOptions) => {
  const brandContext = buildBrandPrompt(options.brandGuidelines);

  const prompt = `
${brandContext}

Create a compelling blog post with the following requirements:
- Topic: ${options.topic}
- Target Audience: ${options.targetAudience}
- Tone: ${options.tone}
- Target Length: ${lengthGuide[options.length]} words
- Focus Keywords: ${options.keywords.join(', ')}

Structure the blog post with:
1. Engaging headline
2. Introduction (hook the reader)
3. 3-4 main sections with subheadings
4. Conclusion with call-to-action

Ensure the content is:
- SEO-optimized
- Maintains brand voice throughout
- Naturally incorporates keywords
- Provides real value to the reader

Format the response as JSON with keys: title, content, seoScore`;

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
      keywords: options.keywords,
    });

    return {
      title: parsed.title,
      content: parsed.content,
      seoScore,
    };
  } catch (error) {
    throw new Error(`Blog generation failed: ${error}`);
  }
};
