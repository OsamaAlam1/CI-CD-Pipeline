import type { InputHTMLAttributes, ReactNode } from 'react';
import { colors } from '../theme/colors';
import './Checkbox.css';

type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: ReactNode;
  error?: string;
};

export function Checkbox({ label, error, style, ...rest }: CheckboxProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
      <label
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          cursor: 'pointer',
          fontSize: '0.9rem',
          color: colors.textPrimary,
        }}
      >
        <input
          type="checkbox"
          style={{
            width: '18px',
            height: '18px',
            cursor: 'pointer',
            accentColor: colors.primary,
            ...style,
          }}
          {...rest}
        />
        {label && <span>{label}</span>}
      </label>
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

