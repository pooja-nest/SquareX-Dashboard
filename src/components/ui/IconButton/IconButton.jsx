import React from 'react';
import styles from './IconButton.module.css';

const IconButton = ({
  icon,
  style = 'primary',
  state = 'default',
  size = 'medium',
  onClick,
  disabled,
  loading,
  className = '',
  ...props
}) => {
  // Determine the actual state (loading/disabled take precedence)
  const actualState = loading ? 'loading' : disabled ? 'disabled' : state;

  // Determine if button should be disabled
  const isDisabled = disabled || loading || actualState === 'disabled';

  // Get icon to display
  const getIcon = () => {
    if (icon) {
      return icon;
    }
    if (actualState === 'loading') {
      return <img src="/icons/Loader.svg" alt="Loading" className={styles.loaderIcon} />;
    }
    return <img src="/icons/Star.svg" alt="Icon" className={styles.icon} />;
  };

  // Build class names
  const classNames = [
    styles.iconButton,
    styles[`style_${style}`],
    styles[`state_${actualState}`],
    styles[`size_${size}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={classNames}
      onClick={onClick}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      {...props}
    >
      {getIcon()}
    </button>
  );
};

export default IconButton;

