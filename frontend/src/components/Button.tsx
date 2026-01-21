import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { colors } from '../theme/colors';
import './Button.css';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
  children: ReactNode;
};

export function Button({
  variant = 'primary',
  fullWidth,
  children,
  style,
  ...rest
}: ButtonProps) {
  const baseStyle: React.CSSProperties = {
    borderRadius: 999,
    padding: '0.8rem 1.5rem',
    fontSize: '0.95rem',
    fontWeight: 600,
    border: '1px solid transparent',
    cursor: 'pointer',
    transition: 'background-color 150ms ease, color 150ms ease, border-color 150ms ease, box-shadow 150ms ease',
    width: fullWidth ? '100%' : undefined,
  };

  const variants: Record<'primary' | 'secondary', React.CSSProperties> = {
    primary: {
      backgroundColor: colors.primary,
      color: '#ffffff',
      boxShadow: '0 10px 20px rgba(11, 116, 209, 0.2)',
    },
    secondary: {
      backgroundColor: colors.surface,
      color: colors.primary,
      borderColor: colors.primaryLight,
    },
  };

  return (
    <button
      className={variant === 'primary' ? 'button-primary' : 'button-secondary'}
      style={{ ...baseStyle, ...variants[variant], ...style }}
      {...rest}
    >
      {children}
    </button>
  );
}


