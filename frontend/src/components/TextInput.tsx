import type { InputHTMLAttributes, ReactNode } from 'react';
import { colors } from '../theme/colors';
import './TextInput.css';

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  iconLeft?: ReactNode;
};

export function TextInput({ label, error, iconLeft, style, ...rest }: TextInputProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
      {label && (
        <label
          style={{
            fontSize: '0.9rem',
            fontWeight: 500,
            color: colors.textPrimary,
          }}
        >
          {label}
        </label>
      )}
      <div
        className="text-input-container"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.65rem 0.9rem',
          borderRadius: 999,
          border: `1px solid ${error ? colors.danger : colors.border}`,
          backgroundColor: '#ffffff',
          boxShadow: '0 6px 12px rgba(15, 23, 42, 0.04)',
        }}
      >
        {iconLeft && (
          <span style={{ display: 'inline-flex', color: colors.textSecondary }}>{iconLeft}</span>
        )}
        <input
          style={{
            border: 'none',
            outline: 'none',
            flex: 1,
            fontSize: '0.95rem',
            color: colors.textPrimary,
            background: 'transparent',
            ...style,
          }}
          {...rest}
        />
      </div>
      {error && (
        <span
          style={{
            fontSize: '0.8rem',
            color: colors.danger,
          }}
        >
          {error}
        </span>
      )}
    </div>
  );
}


