// routes/auth.js
import express from 'express';
import { body } from 'express-validator';
import { signup } from '../controllers/authControllers.js';

const router = express.Router();

// Validation middleware lives here (in the route) so controller stays focused on business logic
router.post(
  '/signup',
  [
    body('fname').trim().notEmpty().withMessage('First name is required'),
    body('lname').trim().notEmpty().withMessage('Last name is required'),
    body('phone').trim().notEmpty().withMessage('Phone number is required'),
    body('email').isEmail().withMessage('A valid email is required').normalizeEmail(),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
  ],
  signup
);

export default router;