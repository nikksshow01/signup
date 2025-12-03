import 'express-async-errors'; // must be first-ish so it patches express to catch async errors
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import connectDB from '../signup/config/db.js';
import authRoutes from '../signup/routes/auth.js';
import errorHandler from '../signup/routes/errorhandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ?? 5000;

// Middleware
app.use(cors());
app.use(express.json()); // for JSON bodies
app.use(express.urlencoded({ extended: true })); // for form submissions (x-www-form-urlencoded)

// Serve static frontend (optional)
app.use(express.static(path.join(__dirname, 'public')));

// mount routes
app.use('/api/auth', authRoutes);

// error handler (must come after routes)
app.use(errorHandler);
app.post("/api/auth/signup", async (req, res) => {
     const user = await User.create(req.body);
     res.json(user);
});

// Start server
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};

start();