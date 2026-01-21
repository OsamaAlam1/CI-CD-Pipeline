import { colors } from '../../theme/colors';

interface Department {
  name: string;
  icon: string;
  highlighted?: boolean;
}

const departments: Department[] = [
  { name: 'Emergency Department', icon: '🚨' },
  { name: 'Radiology Department', icon: '📷' },
  { name: 'Obstetrics & Gynecology', icon: '🤱', highlighted: true },
  { name: 'Dentistry Department', icon: '🦷' },
  { name: 'Neurology Department', icon: '🧠' },
  { name: 'Psychiatry Department', icon: '💊' },
];

export function DepartmentsSection() {
  return (
    <section
      style={{
        padding: '4rem 2rem',
        backgroundColor: colors.primaryLight,
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <h2
          style={{
            fontSize: '2.5rem',
            fontWeight: 700,
            color: colors.surface,
            textAlign: 'center',
            marginBottom: '3rem',
          }}
        >
          Departments
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {departments.map((dept, index) => (
            <div
              key={index}
              style={{
                backgroundColor: dept.highlighted ? colors.primary : colors.surface,
                borderRadius: 16,
                padding: '2rem 1.5rem',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                boxShadow: dept.highlighted
                  ? '0 8px 16px rgba(11, 116, 209, 0.3)'
                  : '0 4px 12px rgba(15, 23, 42, 0.1)',
              }}
              onMouseEnter={(e) => {
                if (!dept.highlighted) {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(15, 23, 42, 0.15)';
                }
              }}
              onMouseLeave={(e) => {
                if (!dept.highlighted) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(15, 23, 42, 0.1)';
                }
              }}
            >
              <div
                style={{
                  fontSize: '3rem',
                  marginBottom: '1rem',
                  filter: dept.highlighted ? 'none' : 'grayscale(0.3)',
                }}
              >
                {dept.icon}
              </div>
              <h3
                style={{
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: dept.highlighted ? colors.surface : colors.textPrimary,
                  margin: 0,
                }}
              >
                {dept.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

