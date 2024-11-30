import { Router } from 'express';
import { DiscordOAuth2 } from 'discord-oauth2';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { validateToken } from '../middleware/auth.js';

const router = Router();
const oauth = new DiscordOAuth2({
  clientId: process.env.DISCORD_CLIENT_ID,
  clientSecret: process.env.DISCORD_CLIENT_SECRET,
  redirectUri: process.env.DISCORD_REDIRECT_URI,
});

router.get('/discord', (req, res) => {
  const { refer } = req.query;
  const state = refer ? Buffer.from(refer.toString()).toString('base64') : '';
  
  const url = oauth.generateAuthUrl({
    scope: ['identify', 'email', 'guilds.join'],
    state
  });
  
  res.redirect(url);
});

router.get('/discord/callback', async (req, res) => {
  try {
    const { code, state } = req.query;
    const referralId = state ? Buffer.from(state.toString(), 'base64').toString() : null;

    // Exchange code for token
    const tokens = await oauth.tokenRequest({
      code: code.toString(),
      scope: ['identify', 'email', 'guilds.join'],
      grantType: 'authorization_code',
    });

    // Get user info
    const discordUser = await oauth.getUser(tokens.access_token);

    // Join server
    if (process.env.DISCORD_SERVER_ID) {
      try {
        await oauth.addMember({
          accessToken: tokens.access_token,
          botToken: process.env.DISCORD_BOT_TOKEN,
          guildId: process.env.DISCORD_SERVER_ID,
          userId: discordUser.id,
        });
      } catch (error) {
        console.error('Error adding member to server:', error);
      }
    }

    // Find or create user
    let user = await User.findOne({ discordId: discordUser.id });
    const isNewUser = !user;

    if (!user) {
      user = new User({
        discordId: discordUser.id,
        username: discordUser.username,
        email: discordUser.email,
        avatar: discordUser.avatar,
      });

      // Handle referral for new users
      if (referralId && referralId !== discordUser.id) {
        const referrer = await User.findOne({ discordId: referralId });
        if (referrer) {
          user.referredBy = referralId;
          referrer.referralCount += 1;
          referrer.coins += parseInt(process.env.REFERRAL_BONUS);
          await referrer.save();
        }
      }
    }

    // Update user info
    user.username = discordUser.username;
    user.email = discordUser.email;
    user.avatar = discordUser.avatar;
    await user.save();

    // Generate JWT
    const token = jwt.sign(
      { id: user.discordId, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Redirect to dashboard or home
    res.redirect(isNewUser ? '/dashboard?welcome=true' : '/dashboard');
  } catch (error) {
    console.error('OAuth error:', error);
    res.redirect('/login?error=auth_failed');
  }
});

router.post('/logout', validateToken, (req, res) => {
  res.clearCookie('token');
  res.json({ success: true });
});

export default router;