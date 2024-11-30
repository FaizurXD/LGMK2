import { Router } from 'express';
import { validateApiKey } from '../../middleware/auth.js';
import User from '../../models/User.js';

const router = Router();

router.get('/balance/:userId', validateApiKey, async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({ discordId: userId });
    
    if (!user) {
      return res.status(404).json(0);
    }
    
    res.json(user.coins);
  } catch (error) {
    console.error('Error fetching balance:', error);
    res.status(500).json(0);
  }
});

export default router;