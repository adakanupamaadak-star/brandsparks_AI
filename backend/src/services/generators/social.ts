import { OpenAI } from 'openai';
import { buildBrandPrompt } from '../prompts/brandPrompt';

interface SocialOptions {
  topic: string;
  platform: 'twitter' | 'instagram' | 'linkedin' | 'tiktok' | 'facebook';
  tone: string;
  hashtags: string[];
  brandGuidelines?: any;
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const platformConfigs = {
  twitter: { charLimit: 280, style: 'concise and punchy' },
  instagram: { charLimit: 2200, style: 'engaging and visual' },
  linkedin: { charLimit: 3000, style: 'professional and insightful' },
  tiktok: { charLimit: 150, style: 'trendy and fun' },
  facebook: { charLimit: 63206, style: 'conversational and friendly' },
};

export const generateSocialPost = async (options: SocialOptions) => {
  const brandContext = buildBrandPrompt(options.brandGuidelines);
  const config = platformConfigs[options.platform];

  const prompt = `
${brandContext}

Create a ${options.platform} post with these requirements:
- Topic: ${options.topic}
- Tone: ${options.tone}
- Style: ${config.style}
- Character Limit: ${config.charLimit}
- Include these hashtags: ${options.hashtags.join(' ')}
- Maintain brand voice
- Optimize for engagement

Return as JSON with keys: post, hashtags (array), engagement_tips (array)`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.8,
      max_tokens: 500,
    });

    const content = response.choices[0].message.content;
    const parsed = JSON.parse(content || '{}');

    return {
      post: parsed.post,
      hashtags: parsed.hashtags || options.hashtags,
      engagementTips: parsed.engagement_tips || [],
      platform: options.platform,
    };
  } catch (error) {
    throw new Error(`Social post generation failed: ${error}`);
  }
};
