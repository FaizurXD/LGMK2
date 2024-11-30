import { Router } from 'express';
import { readdir } from 'fs/promises';
import { join } from 'path';
import { validateApiKey } from '../../middleware/auth.js';

const router = Router();

router.get('/', validateApiKey, async (req, res) => {
  try {
    const stocksDir = join(process.cwd(), 'stocks');
    const files = await readdir(stocksDir);
    const stocks = files
      .filter(file => file.endsWith('.txt'))
      .map(file => file.replace('.txt', ''));
    
    res.json(stocks);
  } catch (error) {
    console.error('Error fetching stocks:', error);
    res.status(500).json({ error: 'Failed to fetch stocks' });
  }
});

export default router;