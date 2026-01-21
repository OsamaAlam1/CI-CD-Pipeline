import express from 'express';
import { login, verifyToken, changePassword } from '../controllers/authController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

// Public routes
router.post('/login', login);

// Protected routes
router.get('/verify', authMiddleware, verifyToken);
router.post('/change-password', authMiddleware, changePassword);

export default router;

