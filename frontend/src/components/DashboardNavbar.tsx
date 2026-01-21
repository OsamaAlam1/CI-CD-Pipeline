import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { colors } from '../theme/colors';
import { removeAuthToken } from '../services/authApi';
import './DashboardNavbar.css';

export function DashboardNavbar() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const username = localStorage.getItem('username') || 'User';
  const userRole = localStorage.getItem('role') || 'staff';

  const handleChangePassword = () => {
    setShowDropdown(false);
    navigate('/change-password');
  };

  const handleLogout = () => {
    removeAuthToken();
    navigate('/login');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: `1px solid ${colors.border}`,
        padding: '1rem 2rem',
        boxShadow: '0 2px 8px rgba(15, 23, 42, 0.08)',
      }}
    >
      <div
        style={{
          maxWidth: 1400,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo Section */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            cursor: 'pointer',
          }}
          onClick={() => navigate('/dashboard')}
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
              boxShadow: '0 4px 12px rgba(11, 116, 209, 0.3)',
            }}
          >
            AC
          </div>
          <div>
            <div
              style={{
                fontSize: '1.3rem',
                fontWeight: 700,
                color: colors.textPrimary,
                lineHeight: 1.2,
              }}
            >
              Ali Maternity Clinic
            </div>
            <div
              style={{
                fontSize: '0.75rem',
                color: colors.textSecondary,
                fontWeight: 500,
              }}
            >
              Dashboard
            </div>
          </div>
        </div>

        {/* User Avatar with Dropdown */}
        <div style={{ position: 'relative' }} ref={dropdownRef}>
          <div
            onClick={() => setShowDropdown(!showDropdown)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              cursor: 'pointer',
              padding: '0.5rem',
              borderRadius: 12,
              transition: 'background-color 0.2s',
              backgroundColor: showDropdown ? colors.primaryLight : 'transparent',
            }}
            onMouseEnter={(e) => {
              if (!showDropdown) {
                e.currentTarget.style.backgroundColor = colors.primaryLight;
              }
            }}
            onMouseLeave={(e) => {
              if (!showDropdown) {
                e.currentTarget.style.backgroundColor = 'transparent';
              }
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                backgroundColor: colors.primary,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontSize: '0.9rem',
                fontWeight: 600,
                boxShadow: '0 2px 8px rgba(11, 116, 209, 0.3)',
              }}
            >
              {getInitials(username)}
            </div>
            <div>
              <div
                style={{
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: colors.textPrimary,
                }}
              >
                {username}
              </div>
              <div
                style={{
                  fontSize: '0.75rem',
                  color: colors.textSecondary,
                }}
              >
                {userRole === 'admin' ? 'Admin' : 'Staff'}
              </div>
            </div>
            <div
              style={{
                fontSize: '0.8rem',
                color: colors.textSecondary,
                transition: 'transform 0.2s',
                transform: showDropdown ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            >
              ▼
            </div>
          </div>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div
              className="dashboard-dropdown"
              style={{
                position: 'absolute',
                top: 'calc(100% + 0.5rem)',
                right: 0,
                backgroundColor: colors.surface,
                borderRadius: 12,
                boxShadow: '0 8px 24px rgba(15, 23, 42, 0.15)',
                border: `1px solid ${colors.border}`,
                minWidth: 200,
                overflow: 'hidden',
                zIndex: 1000,
              }}
            >
              <div
                style={{
                  padding: '0.75rem 1rem',
                  borderBottom: `1px solid ${colors.border}`,
                  backgroundColor: colors.background,
                }}
              >
                <div
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: colors.textPrimary,
                  }}
                >
                  {username}
                </div>
                <div
                  style={{
                    fontSize: '0.75rem',
                    color: colors.textSecondary,
                  }}
                >
                  {userRole === 'admin' ? 'Admin Account' : 'Staff Account'}
                </div>
              </div>
              <div
                onClick={handleChangePassword}
                style={{
                  padding: '0.75rem 1rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  fontSize: '0.9rem',
                  color: colors.textPrimary,
                  fontWeight: 500,
                  transition: 'background-color 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colors.primaryLight;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <span>🔒</span>
                <span>Change password</span>
              </div>
              <div
                onClick={handleLogout}
                style={{
                  padding: '0.75rem 1rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  color: colors.danger,
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  transition: 'background-color 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#FEE2E2';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <span>🚪</span>
                <span>Logout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

