import { colors } from '../../theme/colors';

export function AboutUsSection() {
  return (
    <section
      style={{
        padding: '4rem 2rem',
        maxWidth: 1200,
        margin: '0 auto',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '3rem',
          alignItems: 'center',
        }}
      >
        {/* Left side - Images */}
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            position: 'relative',
          }}
        >
          <div
            style={{
              flex: 1,
              borderRadius: 16,
              overflow: 'hidden',
              backgroundColor: colors.primaryLight,
              minHeight: 300,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: colors.textSecondary,
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👩‍⚕️</div>
              <div>Doctor Image</div>
            </div>
          </div>
          <div
            style={{
              width: 200,
              height: 200,
              borderRadius: '50%',
              overflow: 'hidden',
              backgroundColor: colors.primaryLight,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'flex-end',
              marginBottom: '-2rem',
              border: `4px solid ${colors.surface}`,
              color: colors.textSecondary,
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem' }}>👨‍⚕️</div>
            </div>
          </div>
        </div>

        {/* Right side - Content */}
        <div>
          <div
            style={{
              fontSize: '0.85rem',
              fontWeight: 600,
              color: colors.primary,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '0.5rem',
            }}
          >
            About Us
          </div>
          <h2
            style={{
              fontSize: '2.5rem',
              fontWeight: 700,
              color: colors.textPrimary,
              marginBottom: '1rem',
              lineHeight: 1.2,
            }}
          >
            Ali Maternity Clinic
          </h2>
          <p
            style={{
              fontSize: '1rem',
              color: colors.textSecondary,
              lineHeight: 1.6,
              marginBottom: '1.5rem',
            }}
          >
            Our team of experienced medical professionals is dedicated to providing
            compassionate and comprehensive maternity care. We are committed to ensuring
            the health and well-being of both mothers and babies throughout pregnancy,
            delivery, and postpartum care.
          </p>
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
            }}
          >
            <li
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                color: colors.textSecondary,
              }}
            >
              <span style={{ color: colors.primary, fontSize: '1.2rem' }}>✓</span>
              <span>Expert obstetricians and gynecologists</span>
            </li>
            <li
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                color: colors.textSecondary,
              }}
            >
              <span style={{ color: colors.primary, fontSize: '1.2rem' }}>✓</span>
              <span>State-of-the-art facilities</span>
            </li>
            <li
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                color: colors.textSecondary,
              }}
            >
              <span style={{ color: colors.primary, fontSize: '1.2rem' }}>✓</span>
              <span>24/7 emergency care</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

