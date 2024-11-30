import { Router } from 'express';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { validateApiKey, validateToken } from '../../middleware/auth.js';
import Generation from '../../models/Generation.js';
import User from '../../models/User.js';
import { generateHash } from '../../utils/crypto.js';

const router = Router();

router.get('/gen', validateApiKey, validateToken, async (req, res) => {
  try {
    const { service } = req.query;
    const userId = req.user.id;

    // Check cooldown
    const lastGeneration = await Generation.findOne({ 
      userId,
      createdAt: { 
        $gt: new Date(Date.now() - parseInt(process.env.GEN_COOLDOWN) * 1000) 
      }
    });

    if (lastGeneration) {
      const remainingTime = Math.ceil(
        (lastGeneration.createdAt.getTime() + 
        parseInt(process.env.GEN_COOLDOWN) * 1000 - Date.now()) / 1000
      );
      return res.status(429).json({ 
        error: `Cooldown active. Please wait ${remainingTime} seconds.` 
      });
    }

    // Read and parse stock file
    const stockPath = join(process.cwd(), 'stocks', `${service}.txt`);
    const content = await readFile(stockPath, 'utf-8');
    const accounts = content.split('\n').filter(line => line.trim());

    if (accounts.length === 0) {
      return res.status(404).json({ error: 'No accounts available' });
    }

    // Get random account
    const account = accounts[Math.floor(Math.random() * accounts.length)];
    const [email, password] = account.split(':');

    // Generate success page hash
    const hash = generateHash();
    
    // Save generation
    const generation = new Generation({
      userId,
      service,
      account: { email, password },
      hash,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000) // 5 minutes expiry
    });
    await generation.save();

    res.json({ 
      url: `${process.env.APP_URL}/gen/success/${hash}` 
    });
  } catch (error) {
    console.error('Error generating account:', error);
    res.status(500).json({ error: 'Failed to generate account' });
  }
});

router.get('/account/:hash', validateApiKey, validateToken, async (req, res) => {
  try {
    const { hash } = req.params;
    const userId = req.user.id;

    const generation = await Generation.findOne({
      hash,
      userId,
      expiresAt: { $gt: new Date() }
    });

    if (!generation) {
      return res.status(404).json({ error: 'Account not found or expired' });
    }

    res.json({
      service: generation.service,
      account: generation.account
    });
  } catch (error) {
    console.error('Error fetching account:', error);
    res.status(500).json({ error: 'Failed to fetch account' });
  }
});

router.post('/viewed/:hash', validateApiKey, validateToken, async (req, res) => {
  try {
    const { hash } = req.params;
    await Generation.deleteOne({ hash });
    res.json({ success: true });
  } catch (error) {
    console.error('Error marking account as viewed:', error);
    res.status(500).json({ error: 'Failed to mark account as viewed' });
  }
});

export default router;