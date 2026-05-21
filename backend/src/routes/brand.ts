import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// Get brand profile
router.get('/', async (req: AuthRequest, res) => {
  try {
    const brand = await prisma.brandProfile.findUnique({
      where: { userId: req.user!.id },
    });

    res.json(brand || { message: 'No brand profile yet' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch brand' });
  }
});

// Create/Update brand profile
router.post('/', async (req: AuthRequest, res) => {
  try {
    const {
      name,
      description,
      industry,
      targetAudience,
      voiceProfile,
      guidelines,
      keywords,
    } = req.body;

    const brand = await prisma.brandProfile.upsert({
      where: { userId: req.user!.id },
      update: {
        name,
        description,
        industry,
        targetAudience,
        voiceProfile,
        guidelines,
        keywords,
      },
      create: {
        userId: req.user!.id,
        name,
        description,
        industry,
        targetAudience,
        voiceProfile,
        guidelines,
        keywords,
      },
    });

    res.json(brand);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save brand' });
  }
});

// Get tone profiles
router.get('/voice-profiles', async (req: AuthRequest, res) => {
  const profiles = [
    { id: 'professional', name: 'Professional', description: 'Formal, authoritative' },
    { id: 'casual', name: 'Casual', description: 'Friendly, conversational' },
    { id: 'creative', name: 'Creative', description: 'Imaginative, unique' },
    { id: 'academic', name: 'Academic', description: 'Scholarly, detailed' },
    { id: 'sales', name: 'Sales', description: 'Persuasive, action-oriented' },
  ];
  res.json(profiles);
});

export { router as brandRoutes };
