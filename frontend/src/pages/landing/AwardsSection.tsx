import { colors } from '../../theme/colors';

interface Award {
  title: string;
  description: string;
}

const awards: Award[] = [
  {
    title: 'Medical Strategic National Quality Award',
    description: 'Recognized for excellence in healthcare delivery and patient care standards.',
  },
  {
    title: 'Health Leader Award',
    description: 'Acknowledged as a leading healthcare provider in the region.',
  },
  {
    title: 'Outstanding Medical Service to the Community',
    description: 'Committed to serving our community with dedication and compassion.',
  },
  {
    title: 'Best Hospital for Patient Approval',
    description: 'Highest patient satisfaction ratings and positive feedback.',
  },
];

export function AwardsSection() {
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
          fontSize: '0.85rem',
          fontWeight: 600,
          color: colors.primary,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          marginBottom: '0.5rem',
        }}
      >
        Awards
      </div>
      <h2
        style={{
          fontSize: '2.5rem',
          fontWeight: 700,
          color: colors.textPrimary,
          marginBottom: '3rem',
        }}
      >
        Recognition & Excellence
      </h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
        }}
      >
        {awards.map((award, index) => (
          <div
            key={index}
            style={{
              backgroundColor: colors.surface,
              borderRadius: 16,
              padding: '2rem',
              boxShadow: '0 4px 12px rgba(15, 23, 42, 0.1)',
              border: `1px solid ${colors.border}`,
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 12,
                backgroundColor: colors.primaryLight,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem',
                fontSize: '2rem',
              }}
            >
              🏆
            </div>
            <h3
              style={{
                fontSize: '1.1rem',
                fontWeight: 600,
                color: colors.textPrimary,
                marginBottom: '0.75rem',
              }}
            >
              {award.title}
            </h3>
            <p
              style={{
                fontSize: '0.9rem',
                color: colors.textSecondary,
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              {award.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

