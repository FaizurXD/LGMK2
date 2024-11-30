import { Router } from 'express';
import { validateToken } from '../../middleware/auth.js';
import { LinkvertiseService } from '../../utils/linkvertise.js';
import { bypassMiddleware } from '../../utils/antiBypass.js';
import { verifyHCaptcha } from '../../utils/captcha.js';
import { generateHash } from '../../utils/crypto.js';
import User from '../../models/User.js';

const router = Router();
const linkvertiseService = new LinkvertiseService();

router.post('/earn/verify', validateToken, async (req, res) => {
  try {
    const { token } = req.body;
    const userId = req.user.id;

    // Verify hCaptcha
    const isValid = await verifyHCaptcha(token);
    if (!isValid) {
      return res.status(400).json({ error: 'Verification failed' });
    }

    // Check cooldown
    const user = await User.findOne({ discordId: userId });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.lastEarnTime) {
      const cooldown = parseInt(process.env.EARN_COOLDOWN) * 1000;
      const timeElapsed = Date.now() - user.lastEarnTime.getTime();
      
      if (timeElapsed < cooldown) {
        const remaining = Math.ceil((cooldown - timeElapsed) / 1000);
        return res.status(429).json({ 
          error: `Cooldown active. Please wait ${remaining} seconds.` 
        });
      }
    }

    // Generate earn URL and Linkvertise link
    const hash = generateHash();
    const targetUrl = `${process.env.APP_URL}/earn/verify/${userId}/${hash}`;
    const linkvertiseUrl = await linkvertiseService.generateLink(targetUrl);

    // Update user's last earn time
    user.lastEarnTime = new Date();
    await user.save();

    res.json({ url: linkvertiseUrl });
  } catch (error) {
    console.error('Error processing earn request:', error);
    res.status(500).json({ error: 'Failed to process earn request' });
  }
});

router.get('/earn/verify/:userId/:hash', validateToken, bypassMiddleware, async (req, res) => {
  try {
    const { userId, hash } = req.params;
    const { hash: queryHash } = req.query;

    // Verify Linkvertise completion
    const isValid = await linkvertiseService.verifyCompletion(queryHash as string);
    if (!isValid) {
      await handleBypass(userId);
      return res.status(403).json({ 
        error: 'Invalid completion',
        message: 'A penalty has been applied to your account for attempting to bypass the system.'
      });
    }

    // Award coins to user
    const user = await User.findOne({ discordId: userId });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.coins += parseInt(process.env.EARN_COINS);
    await user.save();

    res.json({ 
      success: true,
      message: `Successfully earned ${process.env.EARN_COINS} coins!`,
      newBalance: user.coins
    });
  } catch (error) {
    console.error('Error verifying earn completion:', error);
    res.status(500).json({ error: 'Failed to verify earn completion' });
  }
});

export default router;