import React from 'react';
import styles from './Button.module.css';

const Button = ({
  label = 'Button',
  showLeadingIcon = true,
  showTrailingIcon = false,
  leadingIcon,
  trailingIcon,
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

  // Get leading icon
  const getLeadingIcon = () => {
    if (!showLeadingIcon) return null;
    if (leadingIcon) return leadingIcon;
    if (actualState === 'loading') {
      return <img src="/icons/Loader.svg" alt="Loading" className={styles.loaderIcon} />;
    }
    return <img src="/icons/Star.svg" alt="Icon" className={styles.icon} />;
  };

  // Get trailing icon
  const getTrailingIcon = () => {
    if (!showTrailingIcon) return null;
    if (trailingIcon) return trailingIcon;
    return <img src="/icons/Star.svg" alt="Icon" className={styles.icon} />;
  };

  // Build class names
  const classNames = [
    styles.button,
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
      {getLeadingIcon()}
      <span className={styles.label}>{label}</span>
      {getTrailingIcon()}
    </button>
  );
};

export default Button;

