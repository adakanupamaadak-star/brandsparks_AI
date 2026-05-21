import { Router } from 'express';
import { AuthRequest } from '../middleware/auth';
import { generateBlogPost } from '../services/generators/blog';
import { generateAdCopy } from '../services/generators/adCopy';
import { generateSocialPost } from '../services/generators/social';
import { generateEmail } from '../services/generators/email';
import { generateSEOContent } from '../services/generators/seo';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Generate Blog Post
router.post('/blog', async (req: AuthRequest, res) => {
  try {
    const { topic, targetAudience, tone, length, keywords } = req.body;

    const brand = await prisma.brandProfile.findUnique({
      where: { userId: req.user!.id },
    });

    const content = await generateBlogPost({
      topic,
      targetAudience: targetAudience || brand?.targetAudience,
      tone: tone || brand?.voiceProfile?.tone,
      length: length || 'medium',
      keywords: keywords || brand?.keywords || [],
      brandGuidelines: brand?.guidelines,
    });

    // Save to database
    const savedContent = await prisma.generatedContent.create({
      data: {
        userId: req.user!.id,
        type: 'BLOG',
        title: content.title,
        content: content.content,
        metadata: {
          topic,
          targetAudience,
          tone,
          seoScore: content.seoScore,
        },
      },
    });

    res.json({ ...content, id: savedContent.id });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to generate blog' });
  }
});

// Generate Ad Copy
router.post('/ad-copy', async (req: AuthRequest, res) => {
  try {
    const { productName, productDescription, targetAudience, platform, tone } = req.body;

    const brand = await prisma.brandProfile.findUnique({
      where: { userId: req.user!.id },
    });

    const content = await generateAdCopy({
      productName,
      productDescription,
      targetAudience: targetAudience || brand?.targetAudience,
      platform,
      tone: tone || brand?.voiceProfile?.tone,
      brandGuidelines: brand?.guidelines,
    });

    const savedContent = await prisma.generatedContent.create({
      data: {
        userId: req.user!.id,
        type: 'AD_COPY',
        title: `Ad Copy - ${productName}`,
        content: content.variants.join('\n---\n'),
        metadata: {
          productName,
          platform,
          variants: content.variants,
        },
      },
    });

    res.json({ ...content, id: savedContent.id });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to generate ad copy' });
  }
});

// Generate Social Media Post
router.post('/social', async (req: AuthRequest, res) => {
  try {
    const { topic, platform, tone, hashtags } = req.body;

    const brand = await prisma.brandProfile.findUnique({
      where: { userId: req.user!.id },
    });

    const content = await generateSocialPost({
      topic,
      platform,
      tone: tone || brand?.voiceProfile?.tone,
      hashtags: hashtags || brand?.keywords || [],
      brandGuidelines: brand?.guidelines,
    });

    const savedContent = await prisma.generatedContent.create({
      data: {
        userId: req.user!.id,
        type: 'SOCIAL_MEDIA',
        title: `${platform} Post`,
        content: content.post,
        metadata: {
          platform,
          topic,
          characterCount: content.post.length,
          hashtags: content.hashtags,
        },
      },
    });

    res.json({ ...content, id: savedContent.id });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to generate social post' });
  }
});

// Generate Email
router.post('/email', async (req: AuthRequest, res) => {
  try {
    const { subject, purpose, targetAudience, tone, cta } = req.body;

    const brand = await prisma.brandProfile.findUnique({
      where: { userId: req.user!.id },
    });

    const content = await generateEmail({
      subject,
      purpose,
      targetAudience: targetAudience || brand?.targetAudience,
      tone: tone || brand?.voiceProfile?.tone,
      cta,
      brandGuidelines: brand?.guidelines,
    });

    const savedContent = await prisma.generatedContent.create({
      data: {
        userId: req.user!.id,
        type: 'EMAIL',
        title: subject,
        content: content.body,
        metadata: {
          subject,
          purpose,
          cta,
        },
      },
    });

    res.json({ ...content, id: savedContent.id });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to generate email' });
  }
});

// Generate SEO Content
router.post('/seo', async (req: AuthRequest, res) => {
  try {
    const { keyword, targetAudience, tone, length } = req.body;

    const brand = await prisma.brandProfile.findUnique({
      where: { userId: req.user!.id },
    });

    const content = await generateSEOContent({
      keyword,
      targetAudience: targetAudience || brand?.targetAudience,
      tone: tone || brand?.voiceProfile?.tone,
      length: length || 'medium',
      brandGuidelines: brand?.guidelines,
    });

    const savedContent = await prisma.generatedContent.create({
      data: {
        userId: req.user!.id,
        type: 'SEO_CONTENT',
        title: content.title,
        content: content.content,
        metadata: {
          keyword,
          seoScore: content.seoScore,
          metaDescription: content.metaDescription,
          focusKeywords: content.focusKeywords,
        },
      },
    });

    res.json({ ...content, id: savedContent.id });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to generate SEO content' });
  }
});

// Get generation history
router.get('/history', async (req: AuthRequest, res) => {
  try {
    const contents = await prisma.generatedContent.findMany({
      where: { userId: req.user!.id },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    res.json(contents);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

export { router as generateRoutes };
