import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import type { AuthRequest } from '../middleware/authMiddleware';
import AuditLog from '../models/AuditLog';

const JWT_SECRET: string = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN || '7d';

// Generate JWT token
const generateToken = (userId: string, username: string, role: string): string => {
  const payload = { userId, username, role };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions);
};

// Login user
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    const trimmedUsername = typeof username === 'string' ? username.trim().toLowerCase() : '';

    if (!trimmedUsername || !password) {
      res.status(400).json({
        success: false,
        message: 'Username and password are required',
      });
      return;
    }

    // Find user by username
    const user = await User.findOne({ username: trimmedUsername });

    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Invalid username or password',
      });
      return;
    }

    // Check if user is active
    if (!user.isActive) {
      res.status(401).json({
        success: false,
        message: 'Account is deactivated. Please contact administrator.',
      });
      return;
    }

    // Compare passwords
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      res.status(401).json({
        success: false,
        message: 'Invalid username or password',
      });
      return;
    }

    // Generate token
    const token = generateToken(user._id.toString(), user.username, user.role);

    // Successful login audit log
    await AuditLog.create({
      userId: user._id.toString(),
      username: user.username,
      action: 'LOGIN_SUCCESS',
      resource: 'User',
      details: {
        role: user.role,
      },
    });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: {
          id: user._id,
          username: user.username,
          role: user.role,
        },
      },
    });
  } catch (error: any) {
    console.error('Error during login:', error);

    // Failed login audit log (best-effort, without leaking password)
    try {
      const attemptedUsername = typeof req.body.username === 'string' ? req.body.username.trim().toLowerCase() : undefined;
      if (attemptedUsername) {
        await AuditLog.create({
          action: 'LOGIN_ERROR',
          resource: 'User',
          details: {
            username: attemptedUsername,
            error: error.message,
          },
        });
      }
    } catch {
      // ignore logging errors
    }
    res.status(500).json({
      success: false,
      message: 'Failed to login',
      error: error.message,
    });
  }
};

// Verify token (for checking if user is authenticated)
export const verifyToken = async (req: Request, res: Response): Promise<void> => {
  try {
    // This endpoint is protected by authMiddleware, so if we reach here, token is valid
    const userId = (req as any).userId;
    const user = await User.findById(userId).select('-password');

    if (!user || !user.isActive) {
      res.status(401).json({
        success: false,
        message: 'User not found or inactive',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: {
        user: {
          id: user._id,
          username: user.username,
          role: user.role,
        },
      },
    });
  } catch (error: any) {
    console.error('Error verifying token:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to verify token',
      error: error.message,
    });
  }
};

// Change password for the currently authenticated user
export const changePassword = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.userId;
    const { currentPassword, newPassword } = req.body;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'Not authenticated',
      });
      return;
    }

    // Only admin users are allowed to change passwords in this clinic setup
    if (req.role !== 'admin') {
      res.status(403).json({
        success: false,
        message: 'Only admin users can change passwords',
      });
      return;
    }

    if (!currentPassword || !newPassword) {
      res.status(400).json({
        success: false,
        message: 'Current password and new password are required',
      });
      return;
    }

    if (newPassword.length < 8) {
      res.status(400).json({
        success: false,
        message: 'New password must be at least 8 characters long',
      });
      return;
    }

    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      });
      return;
    }

    const isCurrentValid = await user.comparePassword(currentPassword);

    if (!isCurrentValid) {
      res.status(400).json({
        success: false,
        message: 'Current password is incorrect',
      });
      return;
    }

    // Set new password (will be hashed by the pre-save hook)
    user.password = newPassword;
    await user.save();

    await AuditLog.create({
      userId: user._id.toString(),
      username: user.username,
      action: 'CHANGE_PASSWORD',
      resource: 'User',
      details: {
        role: user.role,
      },
    });

    res.status(200).json({
      success: true,
      message: 'Password updated successfully',
    });
  } catch (error: any) {
    console.error('Error changing password:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to change password',
      error: error.message,
    });
  }
};

