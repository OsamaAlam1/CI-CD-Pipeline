import type { ReactNode } from 'react';
import { colors } from '../theme/colors';

type PageShellProps = {
  children: ReactNode;
};

export function PageShell({ children }: PageShellProps) {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: `radial-gradient(circle at top left, ${colors.primaryLight}, ${colors.background})`,
        padding: '2rem 1.5rem',
      }}
    >
      {children}
    </div>
  );
}


