import React from 'react';
import styles from './StatusIndicator.module.css';

const StatusIndicator = ({
  label = 'Status',
  state = 'default',
  size = 'medium',
  color = 'green',
  onClick,
  className = '',
  ...props
}) => {
  // Normalize state
  const normalizeState = (stateName) => {
    if (!stateName) return 'default';
    const normalized = stateName.toLowerCase();
    if (normalized === 'hover') return 'hover';
    if (normalized === 'pressed') return 'pressed';
    return 'default';
  };

  // Normalize color
  const normalizeColor = (colorName) => {
    if (!colorName) return 'green';
    const normalized = colorName.toLowerCase();
    if (normalized === 'red') return 'red';
    if (normalized === 'yellow') return 'yellow';
    if (normalized === 'blue') return 'blue';
    return 'green';
  };

  const actualState = normalizeState(state);
  const actualColor = normalizeColor(color);
  const normalizedSize = size.toLowerCase();

  // Get indicator dot color
  const getIndicatorColor = () => {
    switch (actualColor) {
      case 'red':
        return '#ec221f';
      case 'yellow':
        return '#eab333';
      case 'blue':
        return '#4432bf';
      case 'green':
      default:
        return '#14ae5c';
    }
  };

  // Get indicator dot
  const getIndicator = () => {
    const colorValue = getIndicatorColor();
    return (
      <div 
        className={styles.indicator}
        style={{ backgroundColor: colorValue }}
      />
    );
  };

  const containerClassNames = [
    styles.statusIndicator,
    styles[`size_${normalizedSize}`],
    styles[`state_${actualState}`],
    styles[`color_${actualColor}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const Component = onClick ? 'button' : 'div';

  return (
    <Component
      className={containerClassNames}
      onClick={onClick}
      type={onClick ? 'button' : undefined}
      {...props}
    >
      {getIndicator()}
      <span className={styles.label}>{label}</span>
    </Component>
  );
};

export default StatusIndicator;

