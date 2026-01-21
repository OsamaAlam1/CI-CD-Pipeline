import { useNavigate } from 'react-router-dom';
import { DashboardNavbar } from '../components/DashboardNavbar';
import { colors } from '../theme/colors';

export function DashboardPage() {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('role') || 'staff';
  const isAdmin = userRole === 'admin';

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
        {/* Welcome Section */}
        <div
          style={{
            marginBottom: '3rem',
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: '2.5rem',
              color: colors.textPrimary,
              fontWeight: 700,
              marginBottom: '0.5rem',
            }}
          >
            Welcome Back
          </h1>
          <p
            style={{
              margin: 0,
              fontSize: '1.1rem',
              color: colors.textSecondary,
            }}
          >
            Manage your clinic operations efficiently
          </p>
        </div>

        {/* Quick Actions */}
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '2rem',
            }}
          >
            <div
              style={{
                width: 4,
                height: 32,
                borderRadius: 2,
                backgroundColor: colors.primary,
              }}
            />
            <h2
              style={{
                margin: 0,
                fontSize: '1.5rem',
                fontWeight: 600,
                color: colors.textPrimary,
              }}
            >
              Quick Actions
            </h2>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem',
            }}
          >
            {/* Generate Ticket Card */}
            <div
              style={{
                backgroundColor: colors.surface,
                borderRadius: 20,
                padding: '2.5rem',
                border: `2px solid ${colors.primary}`,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 16px rgba(11, 116, 209, 0.1)',
                position: 'relative',
                overflow: 'hidden',
              }}
              onClick={() => navigate('/tickets')}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(11, 116, 209, 0.25)';
                e.currentTarget.style.borderColor = colors.primaryDark;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(11, 116, 209, 0.1)';
                e.currentTarget.style.borderColor = colors.primary;
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: -20,
                  right: -20,
                  width: 100,
                  height: 100,
                  borderRadius: '50%',
                  backgroundColor: colors.primaryLight,
                  opacity: 0.3,
                }}
              />
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 16,
                  background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem',
                  color: '#ffffff',
                  fontSize: '2rem',
                  boxShadow: '0 8px 16px rgba(11, 116, 209, 0.3)',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                🎫
              </div>
              <h3
                style={{
                  margin: 0,
                  fontSize: '1.4rem',
                  fontWeight: 700,
                  color: colors.textPrimary,
                  marginBottom: '0.75rem',
                }}
              >
                Generate Ticket
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: '0.95rem',
                  color: colors.textSecondary,
                  lineHeight: 1.6,
                }}
              >
                Create a new patient ticket with all necessary information
              </p>
            </div>

            {/* View Tickets Card */}
            <div
              style={{
                backgroundColor: colors.surface,
                borderRadius: 20,
                padding: '2.5rem',
                border: `2px solid ${colors.border}`,
                opacity: 0.7,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: -20,
                  right: -20,
                  width: 100,
                  height: 100,
                  borderRadius: '50%',
                  backgroundColor: colors.background,
                  opacity: 0.5,
                }}
              />
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 16,
                  backgroundColor: colors.textSecondary,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem',
                  color: '#ffffff',
                  fontSize: '2rem',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                📋
              </div>
              <h3
                style={{
                  margin: 0,
                  fontSize: '1.4rem',
                  fontWeight: 700,
                  color: colors.textPrimary,
                  marginBottom: '0.75rem',
                }}
              >
                View Tickets
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: '0.95rem',
                  color: colors.textSecondary,
                  lineHeight: 1.6,
                }}
              >
                Browse and manage all patient tickets
              </p>
              <div
                style={{
                  marginTop: '1rem',
                  padding: '0.5rem 1rem',
                  backgroundColor: colors.background,
                  borderRadius: 8,
                  display: 'inline-block',
                  fontSize: '0.85rem',
                  color: colors.textSecondary,
                  fontWeight: 500,
                }}
              >
                Coming soon
              </div>
            </div>

            {/* Staff Management Card - Admin Only */}
            {isAdmin && (
              <div
                style={{
                  backgroundColor: colors.surface,
                  borderRadius: 20,
                  padding: '2.5rem',
                  border: `2px solid ${colors.primary}`,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 16px rgba(11, 116, 209, 0.1)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onClick={() => navigate('/staff-management')}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(11, 116, 209, 0.25)';
                  e.currentTarget.style.borderColor = colors.primaryDark;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(11, 116, 209, 0.1)';
                  e.currentTarget.style.borderColor = colors.primary;
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: -20,
                    right: -20,
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    backgroundColor: colors.primaryLight,
                    opacity: 0.3,
                  }}
                />
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 16,
                    background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.5rem',
                    color: '#ffffff',
                    fontSize: '2rem',
                    boxShadow: '0 8px 16px rgba(11, 116, 209, 0.3)',
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  👥
                </div>
                <h3
                  style={{
                    margin: 0,
                    fontSize: '1.4rem',
                    fontWeight: 700,
                    color: colors.textPrimary,
                    marginBottom: '0.75rem',
                  }}
                >
                  Staff Management
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: '0.95rem',
                    color: colors.textSecondary,
                    lineHeight: 1.6,
                  }}
                >
                  Manage staff accounts, roles, and permissions
                </p>
              </div>
            )}

            {/* Patient Records Card */}
            <div
              style={{
                backgroundColor: colors.surface,
                borderRadius: 20,
                padding: '2.5rem',
                border: `2px solid ${colors.border}`,
                opacity: 0.7,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: -20,
                  right: -20,
                  width: 100,
                  height: 100,
                  borderRadius: '50%',
                  backgroundColor: colors.background,
                  opacity: 0.5,
                }}
              />
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 16,
                  backgroundColor: colors.textSecondary,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem',
                  color: '#ffffff',
                  fontSize: '2rem',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                📋
              </div>
              <h3
                style={{
                  margin: 0,
                  fontSize: '1.4rem',
                  fontWeight: 700,
                  color: colors.textPrimary,
                  marginBottom: '0.75rem',
                }}
              >
                Patient Records
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: '0.95rem',
                  color: colors.textSecondary,
                  lineHeight: 1.6,
                }}
              >
                Access and manage patient medical records
              </p>
              <div
                style={{
                  marginTop: '1rem',
                  padding: '0.5rem 1rem',
                  backgroundColor: colors.background,
                  borderRadius: 8,
                  display: 'inline-block',
                  fontSize: '0.85rem',
                  color: colors.textSecondary,
                  fontWeight: 500,
                }}
              >
                Coming soon
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

