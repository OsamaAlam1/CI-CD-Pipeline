import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageShell } from '../components/PageShell';
import { TextInput } from '../components/TextInput';
import { Button } from '../components/Button';
import { colors } from '../theme/colors';
import { login } from '../services/authApi';

export function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password.');
      return;
    }

    setLoading(true);

    try {
      const response = await login({ username: username.trim(), password });

      if (response.success && response.data) {
        // Successfully logged in, redirect to dashboard
        navigate('/dashboard');
      } else {
        setError(response.message || 'Login failed. Please check your credentials.');
      }
    } catch (err: any) {
      setError('An error occurred. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageShell>
      <div
        style={{
          width: '100%',
          maxWidth: 420,
          backgroundColor: colors.surface,
          borderRadius: 24,
          padding: '2.5rem 2rem 2rem',
          boxShadow: '0 18px 45px rgba(15, 23, 42, 0.12)',
        }}
      >
        <div style={{ marginBottom: '1.75rem', textAlign: 'center' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 52,
              height: 52,
              borderRadius: '50%',
              backgroundColor: colors.primaryLight,
              color: colors.primary,
              fontWeight: 700,
              fontSize: '1.3rem',
              marginBottom: '0.75rem',
            }}
          >
            AC
          </div>
          <h1
            style={{
              margin: 0,
              fontSize: '1.6rem',
              color: colors.textPrimary,
              fontWeight: 700,
            }}
          >
            Ali Maternity Clinic
          </h1>
          <p
            style={{
              marginTop: '0.4rem',
              fontSize: '0.9rem',
              color: colors.textSecondary,
            }}
          >
            Sign in to manage appointments and patient records.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <TextInput
            label="Username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextInput
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

          <div style={{ marginTop: '0.5rem' }}>
            <Button type="submit" fullWidth disabled={loading}>
              {loading ? 'Signing in…' : 'Sign in'}
            </Button>
          </div>
        </form>

        <div
          style={{
            marginTop: '1.25rem',
            fontSize: '0.8rem',
            color: colors.textSecondary,
            textAlign: 'center',
          }}
        >
          For staff use only. Contact administration if you need access.
        </div>
      </div>
    </PageShell>
  );
}


