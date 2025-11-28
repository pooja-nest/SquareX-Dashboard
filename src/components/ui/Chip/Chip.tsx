import React from 'react';
import './Chip.css';

export type ChipState = 'default' | 'hover' | 'pressed' | 'active';

export interface ChipProps {
  label: string;
  state?: ChipState;
  active?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRemove?: () => void;
  onClick?: () => void;
  className?: string;
  'aria-label'?: string;
}

const Chip: React.FC<ChipProps> = ({
  label,
  state,
  active = false,
  leftIcon,
  rightIcon,
  onRemove,
  onClick,
  className = '',
  'aria-label': ariaLabel,
  ...props
}) => {
  const currentState = state || (active ? 'active' : 'default');
  const stateClass = `chip-${currentState}`;
  const isClickable = Boolean(onClick);
  const hasRemove = Boolean(onRemove || rightIcon);

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove?.();
  };

  const Component = isClickable ? 'button' : 'div';
  const chipProps = isClickable
    ? {
        type: 'button' as const,
        onClick: handleClick,
        'aria-label': ariaLabel || label,
      }
    : {};

  return (
    <Component
      className={`chip ${stateClass} ${className}`}
      {...chipProps}
      {...props}
    >
      {leftIcon && (
        <span className="chip-left-icon" aria-hidden="true">
          {leftIcon}
        </span>
      )}
      <span className="chip-label">{label}</span>
      {hasRemove && (
        <button
          type="button"
          className="chip-remove"
          onClick={handleRemove}
          aria-label={`Remove ${label}`}
        >
          {rightIcon || (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>
      )}
    </Component>
  );
};

export default Chip;

