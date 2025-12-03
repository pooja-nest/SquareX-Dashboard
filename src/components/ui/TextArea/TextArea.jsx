import React from 'react';
import styles from './TextArea.module.css';

const TextArea = ({
  body = '',
  title = '',
  description = '',
  label = '',
  error = '',
  hasLabel = true,
  hasDescription = true,
  hasError = false,
  showIcon = false,
  chooseIcon = null,
  showTitle = false,
  showDragIcon = true,
  state = 'default',
  placeholder = 'Body',
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

  // Get drag icon
  const getDragIcon = () => {
    if (!showDragIcon) return null;
    return (
      <div className={styles.dragIcon}>
        <img src="/icons/Vector.svg" alt="Drag" className={styles.dragIconImage} />
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

  const textareaWrapperClassNames = [
    styles.textareaWrapper,
    styles[`textareaWrapper_state_${actualState}`],
  ]
    .filter(Boolean)
    .join(' ');

  // Determine if textarea should be disabled
  const isDisabled = disabled || actualState === 'disabled';

  // Determine textarea value/placeholder
  const displayValue = body || '';
  const showPlaceholder = !body && placeholder;

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
        <div className={textareaWrapperClassNames}>
          <div className={styles.textareaInner}>
            <div className={styles.textContent}>
              {showTitle && title && (
                <p className={styles.title}>{title}</p>
              )}
              {showPlaceholder ? (
                <span className={styles.placeholder}>{placeholder}</span>
              ) : (
                <span className={styles.body}>{displayValue}</span>
              )}
            </div>
            {getIcon()}
            {getDragIcon()}
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
  if (actualState === 'hover' || actualState === 'typing' || (actualState === 'default' && !isDisabled)) {
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
        <div className={textareaWrapperClassNames}>
          <div className={styles.textareaInner}>
            <div className={styles.textContent}>
              {showTitle && title && (
                <p className={styles.title}>{title}</p>
              )}
              {showPlaceholder ? (
                <span className={styles.placeholder}>{placeholder}</span>
              ) : (
                <span className={styles.body}>{displayValue}</span>
              )}
            </div>
            {getIcon()}
            {getDragIcon()}
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

export default TextArea;

