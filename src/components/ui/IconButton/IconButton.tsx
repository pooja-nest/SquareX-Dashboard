import React from 'react';
import './IconButton.css';

export type IconButtonVariant = 'primary' | 'secondary' | 'neutral' | 'subtle';

export type IconButtonSize = 'small' | 'medium';

export type IconButtonState = 'default' | 'hover' | 'focus' | 'disabled' | 'loading';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  state?: IconButtonState;
  icon: React.ReactNode;
  loading?: boolean;
  'aria-label': string;
}

const IconButton: React.FC<IconButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  state,
  icon,
  loading = false,
  className = '',
  disabled,
  ...props
}) => {
  const currentState = state || (loading ? 'loading' : disabled ? 'disabled' : 'default');
  const isDisabled = disabled || loading;

  const variantClass = `icon-btn-${variant}`;
  const sizeClass = `icon-btn-${size}`;
  const stateClass = `icon-btn-${currentState}`;

  return (
    <button
      className={`icon-btn ${variantClass} ${sizeClass} ${stateClass} ${className}`}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-busy={loading}
      {...props}
    >
      {loading ? (
        <span className="icon-btn-loading-icon" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="31.416" strokeDashoffset="31.416">
              <animate attributeName="stroke-dasharray" dur="2s" values="0 31.416;15.708 15.708;0 31.416;0 31.416" repeatCount="indefinite" />
              <animate attributeName="stroke-dashoffset" dur="2s" values="0;-15.708;-31.416;-31.416" repeatCount="indefinite" />
            </circle>
          </svg>
        </span>
      ) : (
        <span className="icon-btn-icon" aria-hidden="true">
          {icon}
        </span>
      )}
    </button>
  );
};

export default IconButton;

