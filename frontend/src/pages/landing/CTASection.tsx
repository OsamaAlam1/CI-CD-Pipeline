import { useNavigate } from 'react-router-dom';
import { colors } from '../../theme/colors';
import { Button } from '../../components/Button';

export function CTASection() {
  const navigate = useNavigate();

  return (
    <section
      style={{
        padding: '4rem 2rem',
        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '3rem',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Left - Text */}
        <div>
          <h2
            style={{
              fontSize: '2.5rem',
              fontWeight: 700,
              color: colors.surface,
              marginBottom: '1.5rem',
              lineHeight: 1.2,
            }}
          >
            Don't Let Your Health Take a Backseat!
          </h2>
          <p
            style={{
              fontSize: '1.1rem',
              color: colors.surface,
              marginBottom: '2rem',
              opacity: 0.9,
              lineHeight: 1.6,
            }}
          >
            Book your appointment today and experience compassionate, professional
            maternity care. Our team is here to support you every step of the way.
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Button
              variant="secondary"
              onClick={() => navigate('/login')}
              style={{
                backgroundColor: colors.surface,
                color: colors.primary,
              }}
            >
              Book Appointment
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigate('/tickets')}
              style={{
                backgroundColor: 'transparent',
                color: colors.surface,
                borderColor: colors.surface,
              }}
            >
              Generate Ticket
            </Button>
          </div>
        </div>

        {/* Right - Image/Icon */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <div
            style={{
              width: 300,
              height: 300,
              borderRadius: '50%',
              backgroundColor: colors.surface,
              opacity: 0.1,
              position: 'absolute',
            }}
          />
          <div
            style={{
              width: 200,
              height: 200,
              borderRadius: '50%',
              backgroundColor: colors.surface,
              opacity: 0.2,
              position: 'absolute',
            }}
          />
          <div
            style={{
              fontSize: '8rem',
              position: 'relative',
              zIndex: 1,
            }}
          >
            🛡️
          </div>
        </div>
      </div>
    </section>
  );
}

