import React from 'react';
import styles from './Dropdown.module.css';

const Dropdown = ({
  value = '',
  description = '',
  label = '',
  error = '',
  hasLabel = true,
  hasDescription = true,
  hasError = false,
  hasChips = false,
  state = 'default',
  type = 'medium',
  placeholder = 'Value',
  chips = [],
  onChange,
  onFocus,
  onBlur,
  disabled,
  className = '',
  ...props
}) => {
  // Normalize state name
  const normalizeState = (stateName) => {
    if (!stateName) return 'default';
    const normalized = stateName.toLowerCase().replace(/\s+/g, '').replace(/-/g, '');
    if (normalized === 'selected') return 'selected';
    if (normalized === 'focused') return 'focused';
    if (normalized === 'hover') return 'hover';
    if (normalized === 'error') return 'error';
    if (normalized === 'disabled') return 'disabled';
    return normalized;
  };

  // Normalize type
  const normalizedType = type.toLowerCase();

  // Determine actual state (disabled takes precedence)
  const actualState = disabled ? 'disabled' : normalizeState(state);

  // Get chevron icon
  const getChevronIcon = () => {
    const isFocused = actualState === 'focused';
    return (
      <div className={`${styles.chevronWrapper} ${isFocused ? styles.chevronRotated : ''}`}>
        <img src="/icons/chevron.svg" alt="Chevron" className={styles.chevronIcon} />
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
    styles[`type_${normalizedType}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const dropdownWrapperClassNames = [
    styles.dropdownWrapper,
    styles[`dropdownWrapper_type_${normalizedType}`],
    styles[`dropdownWrapper_state_${actualState}`],
    styles[`dropdownWrapper_type_${normalizedType}_state_${actualState}`],
  ]
    .filter(Boolean)
    .join(' ');

  // Determine if dropdown should be disabled
  const isDisabled = disabled || actualState === 'disabled';

  // Determine dropdown value/placeholder
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
        <div className={dropdownWrapperClassNames}>
          <div className={styles.dropdownInner}>
            {showPlaceholder ? (
              <span className={styles.placeholder}>{placeholder}</span>
            ) : (
              <span className={styles.value}>{displayValue}</span>
            )}
            {getChips()}
            {getChevronIcon()}
          </div>
        </div>
        {hasError && error && (
          <p className={styles.error}>{error}</p>
        )}
      </div>
    );
  };

  // For interactive states, use button wrapper
  if (actualState === 'hover' || actualState === 'selected' || (actualState === 'default' && !isDisabled) || actualState === 'focused') {
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
        <div className={dropdownWrapperClassNames}>
          <div className={styles.dropdownInner}>
            {showPlaceholder ? (
              <span className={styles.placeholder}>{placeholder}</span>
            ) : (
              <span className={styles.value}>{displayValue}</span>
            )}
            {getChips()}
            {getChevronIcon()}
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

export default Dropdown;

