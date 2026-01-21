import type { TextareaHTMLAttributes } from 'react';
import { colors } from '../theme/colors';
import './TextArea.css';

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
};

export function TextArea({ label, error, style, ...rest }: TextAreaProps) {
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
        className="textarea-container"
        style={{
          borderRadius: 16,
          border: `1px solid ${error ? colors.danger : colors.border}`,
          backgroundColor: '#ffffff',
          boxShadow: '0 6px 12px rgba(15, 23, 42, 0.04)',
        }}
      >
        <textarea
          style={{
            width: '100%',
            padding: '0.65rem 0.9rem',
            border: 'none',
            outline: 'none',
            fontSize: '0.95rem',
            color: colors.textPrimary,
            background: 'transparent',
            resize: 'vertical',
            minHeight: '80px',
            fontFamily: 'inherit',
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

