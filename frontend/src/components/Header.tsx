import { useNavigate } from 'react-router-dom';
import { colors } from '../theme/colors';
import { Button } from './Button';

export function Header() {
  const navigate = useNavigate();

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: `1px solid ${colors.border}`,
        padding: '1rem 2rem',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            cursor: 'pointer',
          }}
          onClick={() => navigate('/')}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              backgroundColor: colors.primary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontSize: '1.2rem',
              fontWeight: 700,
            }}
          >
            AC
          </div>
          <div
            style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              color: colors.textPrimary,
            }}
          >
            Ali Maternity Clinic
          </div>
        </div>

        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2rem',
          }}
        >
          <a
            href="#about"
            style={{
              color: colors.textPrimary,
              textDecoration: 'none',
              fontSize: '0.95rem',
              fontWeight: 500,
            }}
          >
            About
          </a>
          <a
            href="#departments"
            style={{
              color: colors.textPrimary,
              textDecoration: 'none',
              fontSize: '0.95rem',
              fontWeight: 500,
            }}
          >
            Departments
          </a>
          <a
            href="#reviews"
            style={{
              color: colors.textPrimary,
              textDecoration: 'none',
              fontSize: '0.95rem',
              fontWeight: 500,
            }}
          >
            Reviews
          </a>
          <Button
            variant="primary"
            onClick={() => navigate('/login')}
            style={{ padding: '0.6rem 1.5rem' }}
          >
            Login
          </Button>
        </nav>
      </div>
    </header>
  );
}

