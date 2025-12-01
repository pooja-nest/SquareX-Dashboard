import React from 'react';
import './Badge.css';

export type BadgeVariant = 'active' | 'inactive' | 'default';

export interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  className?: string;
  'aria-label'?: string;
}

const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'default',
  className = '',
  'aria-label': ariaLabel,
  ...props
}) => {
  return (
    <span
      className={`badge badge-${variant} ${className}`}
      aria-label={ariaLabel || label}
      {...props}
    >
      {label}
    </span>
  );
};

export default Badge;

