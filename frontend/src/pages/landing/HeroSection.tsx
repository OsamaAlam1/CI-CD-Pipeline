import { useNavigate } from 'react-router-dom';
import { colors } from '../../theme/colors';
import { Button } from '../../components/Button';

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <section
      style={{
        minHeight: '90vh',
        background: `linear-gradient(135deg, ${colors.primaryDark} 0%, ${colors.primary} 50%, ${colors.primaryLight} 100%)`,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        padding: '4rem 2rem',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Left - Content */}
        <div>
          <h1
            style={{
              fontSize: '3.5rem',
              fontWeight: 700,
              color: colors.surface,
              marginBottom: '1.5rem',
              lineHeight: 1.2,
            }}
          >
            Compassionate care, exceptional results.
          </h1>
          <div
            style={{
              fontSize: '1.2rem',
              fontWeight: 600,
              color: colors.surface,
              marginBottom: '1rem',
              opacity: 0.9,
            }}
          >
            Ali Maternity Clinic
          </div>
          <p
            style={{
              fontSize: '1.1rem',
              color: colors.surface,
              marginBottom: '2rem',
              lineHeight: 1.6,
              opacity: 0.9,
            }}
          >
            Our team of experienced doctors and healthcare professionals is dedicated
            to providing quality care for mothers and babies. We combine medical
            expertise with compassionate support throughout your journey.
          </p>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem' }}>
            <Button
              variant="secondary"
              onClick={() => navigate('/login')}
              style={{
                backgroundColor: colors.surface,
                color: colors.primary,
              }}
            >
              Get Started
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
              See how we work →
            </Button>
          </div>

          {/* Statistics */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '2rem',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              borderRadius: 16,
              padding: '2rem',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            <div>
              <div
                style={{
                  fontSize: '2.5rem',
                  fontWeight: 700,
                  color: colors.surface,
                  marginBottom: '0.5rem',
                }}
              >
                20+
              </div>
              <div
                style={{
                  fontSize: '0.9rem',
                  color: colors.surface,
                  opacity: 0.9,
                }}
              >
                Years of experience
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: '2.5rem',
                  fontWeight: 700,
                  color: colors.surface,
                  marginBottom: '0.5rem',
                }}
              >
                95%
              </div>
              <div
                style={{
                  fontSize: '0.9rem',
                  color: colors.surface,
                  opacity: 0.9,
                }}
              >
                Patient satisfaction
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: '2.5rem',
                  fontWeight: 700,
                  color: colors.surface,
                  marginBottom: '0.5rem',
                }}
              >
                5,000+
              </div>
              <div
                style={{
                  fontSize: '0.9rem',
                  color: colors.surface,
                  opacity: 0.9,
                }}
              >
                Patients served annually
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: '2.5rem',
                  fontWeight: 700,
                  color: colors.surface,
                  marginBottom: '0.5rem',
                }}
              >
                10+
              </div>
              <div
                style={{
                  fontSize: '0.9rem',
                  color: colors.surface,
                  opacity: 0.9,
                }}
              >
                Healthcare providers
              </div>
            </div>
          </div>
        </div>

        {/* Right - Images */}
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: 250,
              height: 350,
              borderRadius: 16,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '4rem',
            }}
          >
            👨‍⚕️
          </div>
          <div
            style={{
              width: 200,
              height: 280,
              borderRadius: 16,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '3rem',
              alignSelf: 'flex-end',
            }}
          >
            👩‍👧
          </div>
        </div>
      </div>
    </section>
  );
}

