import type { SelectHTMLAttributes, ReactNode } from 'react';
import { colors } from '../theme/colors';
import './Select.css';

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
};

export function Select({ label, error, options, style, ...rest }: SelectProps) {
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
        className="select-container"
        style={{
          position: 'relative',
          borderRadius: 999,
          border: `1px solid ${error ? colors.danger : colors.border}`,
          backgroundColor: '#ffffff',
          boxShadow: '0 6px 12px rgba(15, 23, 42, 0.04)',
        }}
      >
        <select
          style={{
            width: '100%',
            padding: '0.65rem 0.9rem',
            border: 'none',
            outline: 'none',
            fontSize: '0.95rem',
            color: colors.textPrimary,
            background: 'transparent',
            appearance: 'none',
            cursor: 'pointer',
            ...style,
          }}
          {...rest}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span
          style={{
            position: 'absolute',
            right: '0.9rem',
            top: '50%',
            transform: 'translateY(-50%)',
            pointerEvents: 'none',
            color: colors.textSecondary,
            fontSize: '0.8rem',
          }}
        >
          ▼
        </span>
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

