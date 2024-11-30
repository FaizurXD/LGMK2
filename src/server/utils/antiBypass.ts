import { Request, Response, NextFunction } from 'express';
import User from '../models/User.js';

export const handleBypass = async (userId: string): Promise<void> => {
  try {
    const user = await User.findOne({ discordId: userId });
    if (user) {
      const penaltyAmount = parseInt(process.env.PENALTY_COINS);
      user.coins = Math.max(0, user.coins - penaltyAmount);
      await user.save();
    }
  } catch (error) {
    console.error('Error handling bypass penalty:', error);
    throw new Error('Failed to apply bypass penalty');
  }
};

export const bypassMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { hash } = req.query;
  
  if (!hash) {
    await handleBypass(req.user.id);
    return res.status(403).json({ 
      error: 'Bypass detected',
      message: 'A penalty has been applied to your account for attempting to bypass the system.'
    });
  }
  
  next();
};