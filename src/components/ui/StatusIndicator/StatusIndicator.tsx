import React from 'react';
import './StatusIndicator.css';

export type StatusIndicatorVariant = 'green' | 'yellow' | 'red' | 'blue';

export type StatusIndicatorState = 'default' | 'hover' | 'pressed';

export interface StatusIndicatorProps {
  label: string;
  variant?: StatusIndicatorVariant;
  state?: StatusIndicatorState;
  onClick?: () => void;
  className?: string;
  'aria-label'?: string;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  label,
  variant = 'green',
  state,
  onClick,
  className = '',
  'aria-label': ariaLabel,
  ...props
}) => {
  const currentState = state || 'default';
  const variantClass = `status-indicator-${variant}`;
  const stateClass = `status-indicator-${currentState}`;
  const isClickable = Boolean(onClick);

  const Component = isClickable ? 'button' : 'div';
  const componentProps = isClickable
    ? {
        type: 'button' as const,
        onClick,
        'aria-label': ariaLabel || label,
      }
    : {};

  const indicatorColors = {
    green: '#14ae5c',
    yellow: '#eab333',
    red: '#ec221f',
    blue: '#4432bf',
  };

  return (
    <Component
      className={`status-indicator ${variantClass} ${stateClass} ${className}`}
      {...componentProps}
      {...props}
    >
      <span
        className="status-indicator-dot"
        style={{ backgroundColor: indicatorColors[variant] }}
        aria-hidden="true"
      />
      <span className="status-indicator-label">{label}</span>
    </Component>
  );
};

export default StatusIndicator;

