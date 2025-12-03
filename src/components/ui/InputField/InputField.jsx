import React from 'react';
import styles from './InputField.module.css';

const InputField = ({
  value = '',
  description = '',
  label = '',
  error = '',
  hasLabel = true,
  hasDescription = true,
  hasError = false,
  hasChips = false,
  showIcon = false,
  chooseIcon = null,
  state = 'default',
  placeholder = 'Value',
  chips = [],
  onChange,
  onFocus,
  onBlur,
  disabled,
  className = '',
  ...props
}) => {
  // Normalize state name (handle variations like 'filled in' -> 'filled', 'filled in - Hover' -> 'filledHover')
  const normalizeState = (stateName) => {
    if (!stateName) return 'default';
    const normalized = stateName.toLowerCase().replace(/\s+/g, '').replace(/-/g, '');
    // Map variations to standard names
    if (normalized === 'filledin' || normalized === 'filled') return 'filled';
    if (normalized === 'filledinhover' || normalized === 'filledhover' || normalized === 'filled-hover') return 'filledHover';
    if (normalized === 'focused') return 'focused';
    if (normalized === 'typing') return 'typing';
    if (normalized === 'hover') return 'hover';
    if (normalized === 'error') return 'error';
    if (normalized === 'disabled') return 'disabled';
    return normalized;
  };

  // Determine actual state (disabled takes precedence)
  const actualState = disabled ? 'disabled' : normalizeState(state);

  // Get icon element
  const getIcon = () => {
    if (!showIcon) return null;
    if (chooseIcon) return chooseIcon;
    return (
      <div className={styles.iconWrapper}>
        <img src="/icons/Icon.svg" alt="Icon" className={styles.icon} />
      </div>
    );
  };

  // Get chips element
  const getChips = () => {
    if (!hasChips || chips.length === 0) return null;
    return (
      <div className={styles.chipList}>
        {chips.map((chip, index) => (
          <div key={index} className={styles.chip}>
            <span className={styles.chipLabel}>{chip.label || 'Label'}</span>
            {chip.onRemove && (
              <button
                type="button"
                className={styles.chipRemove}
                onClick={(e) => {
                  e.stopPropagation();
                  chip.onRemove();
                }}
                aria-label="Remove chip"
              >
                <img src="/icons/Vector.svg" alt="Remove" className={styles.chipIcon} />
              </button>
            )}
          </div>
        ))}
      </div>
    );
  };

  // Build class names
  const containerClassNames = [
    styles.container,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const inputClassNames = [
    styles.input,
    styles[`state_${actualState}`],
  ]
    .filter(Boolean)
    .join(' ');

  const inputWrapperClassNames = [
    styles.inputWrapper,
    styles[`inputWrapper_state_${actualState}`],
  ]
    .filter(Boolean)
    .join(' ');

  // Determine if input should be disabled
  const isDisabled = disabled || actualState === 'disabled';

  // Determine input value/placeholder
  const displayValue = value || '';
  const showPlaceholder = !value && placeholder;

  // Render based on state
  const renderContent = () => {
    return (
      <div className={containerClassNames}>
        {hasLabel && label && (
          <label className={styles.label} htmlFor={props.id}>
            {label}
          </label>
        )}
        {hasDescription && description && (
          <p className={styles.description}>{description}</p>
        )}
        <div className={inputWrapperClassNames}>
          <div className={styles.inputInner}>
            {showPlaceholder ? (
              <span className={styles.placeholder}>{placeholder}</span>
            ) : (
              <span className={styles.value}>{displayValue}</span>
            )}
            {getIcon()}
            {getChips()}
            {(actualState === 'focused' || actualState === 'typing') && (
              <span className={styles.cursor}>|</span>
            )}
          </div>
        </div>
        {hasError && error && (
          <p className={styles.error}>{error}</p>
        )}
      </div>
    );
  };

  // For interactive states, use button wrapper
  if (actualState === 'hover' || actualState === 'typing' || (actualState === 'default' && !isDisabled) || actualState === 'filledHover') {
    return (
      <button
        type="button"
        className={containerClassNames}
        onClick={onFocus}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        {...props}
      >
        {hasLabel && label && (
          <label className={styles.label} htmlFor={props.id}>
            {label}
          </label>
        )}
        {hasDescription && description && (
          <p className={styles.description}>{description}</p>
        )}
        <div className={inputWrapperClassNames}>
          <div className={styles.inputInner}>
            {showPlaceholder ? (
              <span className={styles.placeholder}>{placeholder}</span>
            ) : (
              <span className={styles.value}>{displayValue}</span>
            )}
            {getIcon()}
            {getChips()}
            {(actualState === 'focused' || actualState === 'typing') && (
              <span className={styles.cursor}>|</span>
            )}
          </div>
        </div>
        {hasError && error && (
          <p className={styles.error}>{error}</p>
        )}
      </button>
    );
  }

  return renderContent();
};

export default InputField;

