import mongoose from 'mongoose';

const stockSchema = new mongoose.Schema({
  service: { type: String, required: true },
  accounts: [{
    email: String,
    password: String,
    used: { type: Boolean, default: false }
  }],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Stock', stockSchema);