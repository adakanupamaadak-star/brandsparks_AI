import { OpenAI } from 'openai';
import { buildBrandPrompt } from '../prompts/brandPrompt';

interface AdCopyOptions {
  productName: string;
  productDescription: string;
  targetAudience: string;
  platform: 'google' | 'facebook' | 'instagram' | 'linkedin' | 'tiktok';
  tone: string;
  brandGuidelines?: any;
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const platformLimits = {
  google: 30,
  facebook: 125,
  instagram: 2200,
  linkedin: 3000,
  tiktok: 150,
};

export const generateAdCopy = async (options: AdCopyOptions) => {
  const brandContext = buildBrandPrompt(options.brandGuidelines);
  const charLimit = platformLimits[options.platform];

  const prompt = `
${brandContext}

Create 3 variations of ad copy for ${options.platform} with these requirements:
- Product: ${options.productName}
- Description: ${options.productDescription}
- Target Audience: ${options.targetAudience}
- Tone: ${options.tone}
- Character Limit: ${charLimit} characters
- Include a strong call-to-action

Each variation should:
1. Be unique and compelling
2. Follow platform best practices
3. Maintain brand voice
4. Drive engagement/conversions
5. Stay within character limit

Return as JSON with key: variants (array of strings)`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.8,
      max_tokens: 1000,
    });

    const content = response.choices[0].message.content;
    const parsed = JSON.parse(content || '{}');

    return {
      variants: parsed.variants || [],
      platform: options.platform,
    };
  } catch (error) {
    throw new Error(`Ad copy generation failed: ${error}`);
  }
};
