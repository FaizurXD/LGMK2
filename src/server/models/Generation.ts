import mongoose from 'mongoose';

const generationSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  service: { type: String, required: true },
  account: {
    email: String,
    password: String
  },
  hash: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true }
});

export default mongoose.model('Generation', generationSchema);