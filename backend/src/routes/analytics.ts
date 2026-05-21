import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// Dashboard metrics
router.get('/dashboard', async (req: AuthRequest, res) => {
  try {
    const contents = await prisma.generatedContent.findMany({
      where: { userId: req.user!.id },
    });

    const typeBreakdown = {} as Record<string, number>;
    contents.forEach((c) => {
      typeBreakdown[c.type] = (typeBreakdown[c.type] || 0) + 1;
    });

    res.json({
      totalContent: contents.length,
      typeBreakdown,
      lastGenerated: contents[0]?.createdAt,
      thisMonth: contents.filter(
        (c) => new Date(c.createdAt).getMonth() === new Date().getMonth()
      ).length,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

export { router as analyticsRoutes };
