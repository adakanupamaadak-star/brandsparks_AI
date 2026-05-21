/**
 * Brand Voice Prompt Engineering System
 * Injects consistent brand identity into all generated content
 */

interface BrandProfile {
  name?: string;
  voiceProfile?: {
    tone?: string;
    personality?: string[];
  };
  guidelines?: string;
  keywords?: string[];
  description?: string;
}

export const buildBrandPrompt = (brand?: BrandProfile | null): string => {
  if (!brand) {
    return DEFAULT_BRAND_CONTEXT;
  }

  return `
BRAND IDENTITY & VOICE GUIDELINES:

Brand Name: ${brand.name || 'Our Brand'}
Description: ${brand.description || 'A professional brand'}

VOICE & TONE:
- Primary Tone: ${brand.voiceProfile?.tone || 'Professional'}
- Personality Traits: ${brand.voiceProfile?.personality?.join(', ') || 'Reliable, Trustworthy'}

BRAND GUIDELINES:
${brand.guidelines || 'Follow standard professional content guidelines'}

KEY BRAND TERMS & KEYWORDS:
${brand.keywords?.join(', ') || 'Professional, Quality, Innovation'}

IMPORTANT:
- Every piece of content MUST reflect this brand voice
- Use brand-specific terminology where appropriate
- Maintain consistency across all content types
- Never deviate from these guidelines
- If any guideline conflicts with the request, prioritize brand guidelines
`;
};

const DEFAULT_BRAND_CONTEXT = `
BRAND IDENTITY & VOICE GUIDELINES:

Brand Name: Your Brand
Description: A professional, innovative brand committed to quality

VOICE & TONE:
- Primary Tone: Professional yet approachable
- Personality Traits: Innovative, Reliable, Customer-focused

BRAND GUIDELINES:
- Maintain a professional tone
- Be clear and concise
- Focus on customer benefits
- Use inclusive language
- Avoid jargon unless necessary

KEY BRAND TERMS:
Quality, Innovation, Trust, Excellence, Customer-First

IMPORTANT:
- Every piece of content MUST reflect this brand voice
- Use brand-specific terminology where appropriate
- Maintain consistency across all content types
`;

/**
 * Advanced prompt engineering techniques
 */

export const promptTemplates = {
  // Few-shot learning
  fewShotExample: (contentType: string, examples: string[]): string => {
    return `
Here are examples of ${contentType} that match our brand voice:

${examples.map((ex, i) => `Example ${i + 1}:\n${ex}`).join('\n---\n')}

Now create similar ${contentType} that maintains this style...`;
  },

  // Chain of thought
  chainOfThought: (task: string): string => {
    return `
Let's think through this step-by-step:
1. First, identify the key message
2. Then, determine the appropriate tone
3. Next, structure the content logically
4. Finally, ensure brand voice consistency

Task: ${task}`;
  },

  // Role-based prompting
  rolePrompt: (role: string, task: string): string => {
    return `You are a ${role} who specializes in creating content that:
- Maintains strong brand voice
- Resonates with target audiences
- Achieves business objectives
- Follows all brand guidelines

Your task: ${task}`;
  },

  // Constraint-based prompting
  constraintPrompt: (task: string, constraints: Record<string, string>): string => {
    const constraintList = Object.entries(constraints)
      .map(([key, value]) => `- ${key}: ${value}`)
      .join('\n');

    return `
Task: ${task}

Constraints:
${constraintList}

Ensure all constraints are strictly followed.`;
  },
};
