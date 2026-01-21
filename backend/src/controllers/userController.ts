import type { Request, Response } from 'express';
import User from '../models/User';
import AuditLog from '../models/AuditLog';

// List all users (admin only)
export const listUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error: any) {
    console.error('Error listing users:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to list users',
      error: error.message,
    });
  }
};

// Create a new staff user (admin only)
export const createStaffUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password, role } = req.body;

    const trimmedUsername = typeof username === 'string' ? username.trim().toLowerCase() : '';

    if (!trimmedUsername || !password) {
      res.status(400).json({
        success: false,
        message: 'Username and password are required',
      });
      return;
    }

    if (password.length < 8) {
      res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters long',
      });
      return;
    }

    const existing = await User.findOne({ username: trimmedUsername });
    if (existing) {
      res.status(400).json({
        success: false,
        message: 'A user with this username already exists',
      });
      return;
    }

    const user = new User({
      username: trimmedUsername,
      password,
      role: role === 'admin' ? 'admin' : 'staff',
    });

    await user.save();

    await AuditLog.create({
      action: 'CREATE_USER',
      resource: 'User',
      userId: (req as any).userId,
      username: (req as any).username,
      details: {
        createdUserId: user._id,
        createdUsername: user.username,
        createdRole: user.role,
      },
    });

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: {
        id: user._id,
        username: user.username,
        role: user.role,
        isActive: user.isActive,
      },
    });
  } catch (error: any) {
    console.error('Error creating user:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create user',
      error: error.message,
    });
  }
};

// Update user role / active status (admin only)
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { role, isActive } = req.body;

    const update: any = {};
    if (role && ['admin', 'staff'].includes(role)) {
      update.role = role;
    }
    if (typeof isActive === 'boolean') {
      update.isActive = isActive;
    }

    const user = await User.findByIdAndUpdate(id, update, { new: true }).select('-password');

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      });
      return;
    }

    await AuditLog.create({
      action: 'UPDATE_USER',
      resource: 'User',
      userId: (req as any).userId,
      username: (req as any).username,
      details: {
        updatedUserId: user._id,
        updatedUsername: user.username,
        updatedRole: user.role,
        updatedIsActive: user.isActive,
      },
    });

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: user,
    });
  } catch (error: any) {
    console.error('Error updating user:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update user',
      error: error.message,
    });
  }
};

// Admin reset of a user's password
export const resetUserPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { newPassword } = req.body;

    if (!newPassword || newPassword.length < 8) {
      res.status(400).json({
        success: false,
        message: 'New password must be at least 8 characters long',
      });
      return;
    }

    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      });
      return;
    }

    user.password = newPassword;
    await user.save();

    await AuditLog.create({
      action: 'RESET_USER_PASSWORD',
      resource: 'User',
      userId: (req as any).userId,
      username: (req as any).username,
      details: {
        targetUserId: user._id,
        targetUsername: user.username,
      },
    });

    res.status(200).json({
      success: true,
      message: 'User password reset successfully',
    });
  } catch (error: any) {
    console.error('Error resetting user password:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to reset user password',
      error: error.message,
    });
  }
};


