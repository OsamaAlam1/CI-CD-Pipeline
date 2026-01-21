import express from 'express';
import { adminMiddleware, authMiddleware } from '../middleware/authMiddleware';
import { listUsers, createStaffUser, updateUser, resetUserPassword } from '../controllers/userController';

const router = express.Router();

// All user management routes require authentication + admin role
router.use(authMiddleware, adminMiddleware);

router.get('/', listUsers);
router.post('/', createStaffUser);
router.patch('/:id', updateUser);
router.post('/:id/reset-password', resetUserPassword);

export default router;


