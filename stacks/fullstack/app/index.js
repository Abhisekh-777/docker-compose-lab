const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.log('❌ MongoDB error:', err));

// Simple User model
const User = mongoose.model('User', new mongoose.Schema({
  name: String,
  email: String,
  createdAt: { type: Date, default: Date.now }
}));

// Routes
app.get('/health', (req, res) => res.json({ status: 'healthy' }));

app.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.post('/users', async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

app.listen(3000, () => console.log('🚀 API running on port 3000'));
