import { OpenAI } from 'openai';
import { buildBrandPrompt } from '../prompts/brandPrompt';

interface EmailOptions {
  subject: string;
  purpose: 'promotional' | 'newsletter' | 'transactional' | 'nurture';
  targetAudience: string;
  tone: string;
  cta: string;
  brandGuidelines?: any;
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateEmail = async (options: EmailOptions) => {
  const brandContext = buildBrandPrompt(options.brandGuidelines);

  const prompt = `
${brandContext}

Create an email with these specifications:
- Subject: ${options.subject}
- Purpose: ${options.purpose}
- Target Audience: ${options.targetAudience}
- Tone: ${options.tone}
- Call-to-Action: ${options.cta}

Email Structure:
1. Engaging greeting
2. Hook/opening statement
3. Body with 2-3 key points
4. Clear CTA section
5. Professional closing

Requirements:
- Keep it scannable (short paragraphs)
- Maintain brand voice
- Mobile-friendly (consider line breaks)
- Include clear CTA button text: "${options.cta}"
- Professional yet ${options.tone}

Return as JSON with keys: subject, preheader, body, ctaText, footerNote`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const content = response.choices[0].message.content;
    const parsed = JSON.parse(content || '{}');

    return {
      subject: parsed.subject,
      preheader: parsed.preheader,
      body: parsed.body,
      ctaText: parsed.ctaText || options.cta,
      footerNote: parsed.footerNote,
    };
  } catch (error) {
    throw new Error(`Email generation failed: ${error}`);
  }
};
