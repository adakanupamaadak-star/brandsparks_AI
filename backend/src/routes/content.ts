import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// Get all content
router.get('/', async (req: AuthRequest, res) => {
  try {
    const contents = await prisma.generatedContent.findMany({
      where: { userId: req.user!.id },
      orderBy: { createdAt: 'desc' },
    });

    res.json(contents);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch content' });
  }
});

// Get single content
router.get('/:id', async (req: AuthRequest, res) => {
  try {
    const content = await prisma.generatedContent.findUnique({
      where: { id: req.params.id },
    });

    if (!content || content.userId !== req.user!.id) {
      return res.status(404).json({ error: 'Content not found' });
    }

    res.json(content);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch content' });
  }
});

// Update content
router.put('/:id', async (req: AuthRequest, res) => {
  try {
    const { title, content } = req.body;

    const existing = await prisma.generatedContent.findUnique({
      where: { id: req.params.id },
    });

    if (!existing || existing.userId !== req.user!.id) {
      return res.status(404).json({ error: 'Content not found' });
    }

    const updated = await prisma.generatedContent.update({
      where: { id: req.params.id },
      data: { title, content },
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update content' });
  }
});

// Delete content
router.delete('/:id', async (req: AuthRequest, res) => {
  try {
    const existing = await prisma.generatedContent.findUnique({
      where: { id: req.params.id },
    });

    if (!existing || existing.userId !== req.user!.id) {
      return res.status(404).json({ error: 'Content not found' });
    }

    await prisma.generatedContent.delete({
      where: { id: req.params.id },
    });

    res.json({ message: 'Content deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete content' });
  }
});

export { router as contentRoutes };
