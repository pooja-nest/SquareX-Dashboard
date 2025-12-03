import React from 'react';
import styles from './Chip.module.css';

const Chip = ({
  label = 'Label',
  showRightIcon = true,
  showLeftIcon = true,
  chooseLeftIcon = null,
  chooseRightIcon = null,
  state = 'default',
  size = 'medium',
  onRemove,
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
    if (normalized === 'active') return 'active';
    return 'default';
  };

  const actualState = normalizeState(state);
  const normalizedSize = size.toLowerCase();

  // Get left icon
  const getLeftIcon = () => {
    if (!showLeftIcon) return null;
    if (chooseLeftIcon) return chooseLeftIcon;
    
    const iconColor = actualState === 'active' ? '#eceaf9' : '#768494';
    return (
      <div className={styles.iconWrapper}>
        <img 
          src="/icons/X.svg" 
          alt="Icon" 
          className={styles.icon}
          style={{ 
            filter: actualState === 'active' 
              ? 'brightness(0) saturate(100%) invert(95%) sepia(5%) saturate(200%) hue-rotate(240deg) brightness(100%) contrast(100%)'
              : 'none'
          }}
        />
      </div>
    );
  };

  // Get right icon
  const getRightIcon = () => {
    if (!showRightIcon) return null;
    if (chooseRightIcon) return chooseRightIcon;
    
    const iconColor = actualState === 'active' ? '#eceaf9' : '#768494';
    return (
      <div className={styles.iconWrapper}>
        <img 
          src="/icons/X.svg" 
          alt="Remove" 
          className={styles.icon}
          onClick={(e) => {
            e.stopPropagation();
            if (onRemove) onRemove();
          }}
          style={{ 
            filter: actualState === 'active' 
              ? 'brightness(0) saturate(100%) invert(95%) sepia(5%) saturate(200%) hue-rotate(240deg) brightness(100%) contrast(100%)'
              : 'none'
          }}
        />
      </div>
    );
  };

  const containerClassNames = [
    styles.chip,
    styles[`size_${normalizedSize}`],
    styles[`state_${actualState}`],
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
      {getLeftIcon()}
      <span className={styles.label}>{label}</span>
      {getRightIcon()}
    </Component>
  );
};

export default Chip;

