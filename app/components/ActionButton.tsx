import React from 'react';
import { cn } from '@/lib/utils';

interface ActionButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'cyan' | 'pink' | 'lime' | 'violet' | 'yellow' | 'orange' | 'red';
  className?: string;
  disabled?: boolean;
}

const variantColors = {
  cyan: 'bg-cyan',
  pink: 'bg-pink',
  lime: 'bg-lime',
  violet: 'bg-violet',
  yellow: 'bg-yellow',
  orange: 'bg-orange',
  red: 'bg-red',
};

export function ActionButton({
  children,
  onClick,
  href,
  variant = 'yellow',
  className,
  disabled = false,
}: ActionButtonProps) {
  const baseClassName = cn(
    'btn-brutal',
    variantColors[variant],
    'disabled:opacity-50 disabled:cursor-not-allowed',
    className
  );

  if (href) {
    return (
      <a
        href={href}
        className={baseClassName}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className={baseClassName}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
