import React from 'react';
import './Button.css';

export type ButtonVariant = 
  | 'primary' 
  | 'secondary' 
  | 'neutral' 
  | 'subtle' 
  | 'primary-danger' 
  | 'subtle-danger' 
  | 'neutral-danger';

export type ButtonSize = 'small' | 'medium';

export type ButtonState = 'default' | 'hover' | 'focus' | 'disabled' | 'loading';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  state?: ButtonState;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  loading?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  state,
  leadingIcon,
  trailingIcon,
  loading = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const currentState = state || (loading ? 'loading' : disabled ? 'disabled' : 'default');
  const isDisabled = disabled || loading;

  const variantClass = `btn-${variant.replace(/-/g, '-')}`;
  const sizeClass = `btn-${size}`;
  const stateClass = `btn-${currentState}`;

  return (
    <button
      className={`btn ${variantClass} ${sizeClass} ${stateClass} ${className}`}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-busy={loading}
      {...props}
    >
      {loading && (
        <span className="btn-loading-icon" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="31.416" strokeDashoffset="31.416">
              <animate attributeName="stroke-dasharray" dur="2s" values="0 31.416;15.708 15.708;0 31.416;0 31.416" repeatCount="indefinite" />
              <animate attributeName="stroke-dashoffset" dur="2s" values="0;-15.708;-31.416;-31.416" repeatCount="indefinite" />
            </circle>
          </svg>
        </span>
      )}
      {!loading && leadingIcon && (
        <span className="btn-leading-icon" aria-hidden="true">
          {leadingIcon}
        </span>
      )}
      <span className="btn-text">{children}</span>
      {!loading && trailingIcon && (
        <span className="btn-trailing-icon" aria-hidden="true">
          {trailingIcon}
        </span>
      )}
    </button>
  );
};

export default Button;

