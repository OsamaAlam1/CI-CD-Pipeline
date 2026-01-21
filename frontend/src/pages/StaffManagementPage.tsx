import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { DashboardNavbar } from '../components/DashboardNavbar';
import { Button } from '../components/Button';
import { TextInput } from '../components/TextInput';
import { Select } from '../components/Select';
import { colors } from '../theme/colors';
import { userApi, type User, type CreateUserPayload, type UpdateUserPayload, type ResetPasswordPayload } from '../services/userApi';
import { useNavigate } from 'react-router-dom';

export function StaffManagementPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Create user form state
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [createFormData, setCreateFormData] = useState<CreateUserPayload>({
    username: '',
    password: '',
    role: 'staff',
  });
  const [createErrors, setCreateErrors] = useState<Record<string, string>>({});
  const [createLoading, setCreateLoading] = useState(false);

  // Edit user state
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<UpdateUserPayload>({});
  const [resetPasswordUserId, setResetPasswordUserId] = useState<string | null>(null);
  const [resetPasswordData, setResetPasswordData] = useState<ResetPasswordPayload>({ newPassword: '' });

  // Check if user is admin
  const userRole = localStorage.getItem('role') || 'staff';
  const isAdmin = userRole === 'admin';

  useEffect(() => {
    if (!isAdmin) {
      navigate('/dashboard');
      return;
    }
    loadUsers();
  }, [isAdmin, navigate]);

  const loadUsers = async () => {
    setLoading(true);
    setError('');
    const response = await userApi.getAll();
    if (response.success && response.data) {
      setUsers(response.data);
    } else {
      setError(response.message || 'Failed to load users');
    }
    setLoading(false);
  };

  const handleCreateUser = async (e: FormEvent) => {
    e.preventDefault();
    setCreateErrors({});
    setCreateLoading(true);

    // Validation
    const errors: Record<string, string> = {};
    if (!createFormData.username.trim()) {
      errors.username = 'Username is required';
    } else if (createFormData.username.length < 3) {
      errors.username = 'Username must be at least 3 characters';
    }
    if (!createFormData.password) {
      errors.password = 'Password is required';
    } else if (createFormData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }

    if (Object.keys(errors).length > 0) {
      setCreateErrors(errors);
      setCreateLoading(false);
      return;
    }

    const response = await userApi.create(createFormData);
    if (response.success) {
      setSuccess('User created successfully!');
      setCreateFormData({ username: '', password: '', role: 'staff' });
      setShowCreateForm(false);
      loadUsers();
      setTimeout(() => setSuccess(''), 3000);
    } else {
      setCreateErrors({ submit: response.message || 'Failed to create user' });
    }
    setCreateLoading(false);
  };

  const handleUpdateUser = async (userId: string) => {
    if (Object.keys(editFormData).length === 0) {
      setEditingUser(null);
      return;
    }

    const response = await userApi.update(userId, editFormData);
    if (response.success) {
      setSuccess('User updated successfully!');
      setEditingUser(null);
      setEditFormData({});
      loadUsers();
      setTimeout(() => setSuccess(''), 3000);
    } else {
      setError(response.message || 'Failed to update user');
    }
  };

  const handleResetPassword = async (userId: string) => {
    if (!resetPasswordData.newPassword || resetPasswordData.newPassword.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    const response = await userApi.resetPassword(userId, resetPasswordData);
    if (response.success) {
      setSuccess('Password reset successfully!');
      setResetPasswordUserId(null);
      setResetPasswordData({ newPassword: '' });
      setTimeout(() => setSuccess(''), 3000);
    } else {
      setError(response.message || 'Failed to reset password');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: colors.background }}>
      <DashboardNavbar />
      <div
        style={{
          maxWidth: 1400,
          margin: '0 auto',
          padding: '3rem 2rem',
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: '2.5rem',
                color: colors.textPrimary,
                fontWeight: 700,
                marginBottom: '0.5rem',
              }}
            >
              Staff Management
            </h1>
            <p style={{ margin: 0, fontSize: '1.1rem', color: colors.textSecondary }}>
              Manage staff accounts and permissions
            </p>
          </div>
          <Button
            onClick={() => {
              setShowCreateForm(!showCreateForm);
              setCreateErrors({});
            }}
          >
            {showCreateForm ? '✕ Cancel' : '+ Add Staff Member'}
          </Button>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div
            style={{
              padding: '1rem 1.25rem',
              borderRadius: 12,
              backgroundColor: '#D1FAE5',
              border: '1px solid #10B981',
              color: '#065F46',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <span>✓</span>
            <span>{success}</span>
          </div>
        )}

        {error && (
          <div
            style={{
              padding: '1rem 1.25rem',
              borderRadius: 12,
              backgroundColor: '#FEE2E2',
              border: '1px solid #DC2626',
              color: '#991B1B',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <span>⚠</span>
            <span>{error}</span>
          </div>
        )}

        {/* Create User Form */}
        {showCreateForm && (
          <div
            style={{
              backgroundColor: colors.surface,
              borderRadius: 20,
              padding: '2rem',
              marginBottom: '2rem',
              boxShadow: '0 4px 16px rgba(15, 23, 42, 0.1)',
            }}
          >
            <h2 style={{ margin: '0 0 1.5rem 0', fontSize: '1.5rem', fontWeight: 600, color: colors.textPrimary }}>
              Create New Staff Member
            </h2>
            <form onSubmit={handleCreateUser} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                <TextInput
                  label="Username *"
                  placeholder="Enter username"
                  value={createFormData.username}
                  onChange={(e) => setCreateFormData({ ...createFormData, username: e.target.value })}
                  error={createErrors.username}
                />
                <TextInput
                  label="Password *"
                  type="password"
                  placeholder="Minimum 8 characters"
                  value={createFormData.password}
                  onChange={(e) => setCreateFormData({ ...createFormData, password: e.target.value })}
                  error={createErrors.password}
                />
              </div>
              <Select
                label="Role"
                value={createFormData.role || 'staff'}
                onChange={(e) => setCreateFormData({ ...createFormData, role: e.target.value as 'admin' | 'staff' })}
                options={[
                  { value: 'staff', label: 'Staff' },
                  { value: 'admin', label: 'Admin' },
                ]}
              />
              {createErrors.submit && (
                <div style={{ color: colors.danger, fontSize: '0.9rem' }}>{createErrors.submit}</div>
              )}
              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                <Button type="submit" disabled={createLoading}>
                  {createLoading ? 'Creating...' : 'Create User'}
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    setShowCreateForm(false);
                    setCreateErrors({});
                    setCreateFormData({ username: '', password: '', role: 'staff' });
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Users Table */}
        <div
          style={{
            backgroundColor: colors.surface,
            borderRadius: 20,
            padding: '2rem',
            boxShadow: '0 4px 16px rgba(15, 23, 42, 0.1)',
            overflowX: 'auto',
          }}
        >
          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: colors.textSecondary }}>
              Loading users...
            </div>
          ) : users.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: colors.textSecondary }}>
              No users found. Create your first staff member above.
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: `2px solid ${colors.border}` }}>
                  <th style={{ textAlign: 'left', padding: '1rem', fontSize: '0.9rem', fontWeight: 600, color: colors.textSecondary }}>
                    Username
                  </th>
                  <th style={{ textAlign: 'left', padding: '1rem', fontSize: '0.9rem', fontWeight: 600, color: colors.textSecondary }}>
                    Role
                  </th>
                  <th style={{ textAlign: 'left', padding: '1rem', fontSize: '0.9rem', fontWeight: 600, color: colors.textSecondary }}>
                    Status
                  </th>
                  <th style={{ textAlign: 'left', padding: '1rem', fontSize: '0.9rem', fontWeight: 600, color: colors.textSecondary }}>
                    Created
                  </th>
                  <th style={{ textAlign: 'right', padding: '1rem', fontSize: '0.9rem', fontWeight: 600, color: colors.textSecondary }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} style={{ borderBottom: `1px solid ${colors.border}` }}>
                    <td style={{ padding: '1rem', fontSize: '0.95rem', color: colors.textPrimary, fontWeight: 500 }}>
                      {user.username}
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <span
                        style={{
                          display: 'inline-block',
                          padding: '0.25rem 0.75rem',
                          borderRadius: 999,
                          fontSize: '0.85rem',
                          fontWeight: 600,
                          backgroundColor: user.role === 'admin' ? colors.primaryLight : colors.background,
                          color: user.role === 'admin' ? colors.primary : colors.textSecondary,
                        }}
                      >
                        {user.role === 'admin' ? '👑 Admin' : '👤 Staff'}
                      </span>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <span
                        style={{
                          display: 'inline-block',
                          padding: '0.25rem 0.75rem',
                          borderRadius: 999,
                          fontSize: '0.85rem',
                          fontWeight: 600,
                          backgroundColor: user.isActive ? '#D1FAE5' : '#FEE2E2',
                          color: user.isActive ? '#065F46' : '#991B1B',
                        }}
                      >
                        {user.isActive ? '✓ Active' : '✕ Inactive'}
                      </span>
                    </td>
                    <td style={{ padding: '1rem', fontSize: '0.9rem', color: colors.textSecondary }}>
                      {formatDate(user.createdAt)}
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                        {editingUser === user._id ? (
                          <>
                            <Select
                              value={editFormData.role || user.role}
                              onChange={(e) => setEditFormData({ ...editFormData, role: e.target.value as 'admin' | 'staff' })}
                              options={[
                                { value: 'staff', label: 'Staff' },
                                { value: 'admin', label: 'Admin' },
                              ]}
                              style={{ width: 120, padding: '0.4rem 0.6rem', fontSize: '0.85rem' }}
                            />
                            <Select
                              value={editFormData.isActive !== undefined ? (editFormData.isActive ? 'true' : 'false') : (user.isActive ? 'true' : 'false')}
                              onChange={(e) => setEditFormData({ ...editFormData, isActive: e.target.value === 'true' })}
                              options={[
                                { value: 'true', label: 'Active' },
                                { value: 'false', label: 'Inactive' },
                              ]}
                              style={{ width: 120, padding: '0.4rem 0.6rem', fontSize: '0.85rem' }}
                            />
                            <Button
                              onClick={() => handleUpdateUser(user._id)}
                              style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
                            >
                              Save
                            </Button>
                            <Button
                              variant="secondary"
                              onClick={() => {
                                setEditingUser(null);
                                setEditFormData({});
                              }}
                              style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
                            >
                              Cancel
                            </Button>
                          </>
                        ) : resetPasswordUserId === user._id ? (
                          <>
                            <TextInput
                              type="password"
                              placeholder="New password (min 8 chars)"
                              value={resetPasswordData.newPassword}
                              onChange={(e) => setResetPasswordData({ newPassword: e.target.value })}
                              style={{ width: 200, padding: '0.4rem 0.6rem', fontSize: '0.85rem' }}
                            />
                            <Button
                              onClick={() => handleResetPassword(user._id)}
                              style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
                            >
                              Reset
                            </Button>
                            <Button
                              variant="secondary"
                              onClick={() => {
                                setResetPasswordUserId(null);
                                setResetPasswordData({ newPassword: '' });
                              }}
                              style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
                            >
                              Cancel
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              variant="secondary"
                              onClick={() => {
                                setEditingUser(user._id);
                                setEditFormData({});
                                setResetPasswordUserId(null);
                              }}
                              style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="secondary"
                              onClick={() => {
                                setResetPasswordUserId(user._id);
                                setResetPasswordData({ newPassword: '' });
                                setEditingUser(null);
                              }}
                              style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
                            >
                              Reset Password
                            </Button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

