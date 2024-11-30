import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  discordId: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  avatar: String,
  coins: { type: Number, default: 0 },
  referredBy: { type: String, default: null },
  referralCount: { type: Number, default: 0 },
  lastEarnTime: { type: Date, default: null },
  joinedServers: [String],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('User', userSchema);