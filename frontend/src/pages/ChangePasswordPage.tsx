import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageShell } from '../components/PageShell';
import { TextInput } from '../components/TextInput';
import { Button } from '../components/Button';
import { colors } from '../theme/colors';
import { changePassword } from '../services/authApi';

export function ChangePasswordPage() {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (newPassword.length < 8) {
      setError('New password must be at least 8 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New password and confirm password do not match.');
      return;
    }

    setLoading(true);

    try {
      const response = await changePassword({ currentPassword, newPassword });

      if (response.success) {
        setSuccess('Password updated successfully.');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');

        setTimeout(() => {
          navigate('/dashboard');
        }, 1200);
      } else {
        setError(response.message || 'Failed to change password.');
      }
    } catch (err: any) {
      console.error('Change password error:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageShell>
      <div
        style={{
          width: '100%',
          maxWidth: 480,
          backgroundColor: colors.surface,
          borderRadius: 24,
          padding: '2.5rem 2.25rem 2rem',
          boxShadow: '0 18px 45px rgba(15, 23, 42, 0.12)',
        }}
      >
        <div style={{ marginBottom: '2rem' }}>
          <h1
            style={{
              margin: 0,
              fontSize: '1.6rem',
              color: colors.textPrimary,
              fontWeight: 700,
            }}
          >
            Change Password
          </h1>
          <p
            style={{
              marginTop: '0.5rem',
              fontSize: '0.9rem',
              color: colors.textSecondary,
            }}
          >
            For security, please use a strong password that you have not used elsewhere.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <TextInput
            label="Current Password"
            type="password"
            placeholder="Enter your current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <TextInput
            label="New Password"
            type="password"
            placeholder="Enter a new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextInput
            label="Confirm New Password"
            type="password"
            placeholder="Re-enter new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {error && (
            <div
              style={{
                fontSize: '0.85rem',
                color: colors.danger,
                marginTop: '0.2rem',
              }}
            >
              {error}
            </div>
          )}

          {success && (
            <div
              style={{
                fontSize: '0.85rem',
                color: '#16A34A',
                marginTop: '0.2rem',
              }}
            >
              {success}
            </div>
          )}

          <div style={{ marginTop: '0.5rem' }}>
            <Button type="submit" fullWidth disabled={loading}>
              {loading ? 'Updating…' : 'Update Password'}
            </Button>
          </div>
        </form>
      </div>
    </PageShell>
  );
}


