import React from 'react';
import styles from './Search.module.css';

const Search = ({
  value = '',
  error = '',
  hasError = false,
  state = 'default',
  placeholder = 'Search',
  onChange,
  onFocus,
  onBlur,
  disabled,
  className = '',
  title = '',
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

  // Get search icon
  const getSearchIcon = () => {
    return (
      <div className={styles.searchIcon}>
        <img src="/icons/search.svg" alt="Search" className={styles.searchIconImage} />
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
    styles[`input_state_${actualState}`],
  ]
    .filter(Boolean)
    .join(' ');

  const inputInnerClassNames = [
    styles.inputInner,
    styles[`inputInner_state_${actualState}`],
  ]
    .filter(Boolean)
    .join(' ');

  // Determine if input should be disabled
  const isDisabled = disabled || actualState === 'disabled';

  // Determine input value/placeholder
  const displayValue = value || '';
  const showPlaceholder = !value && placeholder;
  const isTyping = actualState === 'typing' && displayValue !== '';

  // Render based on state
  const renderContent = () => {
    return (
      <div className={containerClassNames} title={title}>
        <div className={inputClassNames}>
          <div className={inputInnerClassNames}>
            {getSearchIcon()}
            {showPlaceholder ? (
              <span className={styles.placeholder}>{placeholder}</span>
            ) : (
              <span className={styles.value}>{displayValue}</span>
            )}
            {(actualState === 'focused' || actualState === 'typing') && (
              <span className={`${styles.cursor} ${isTyping ? styles.cursorTyping : ''}`}>|</span>
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
  if (actualState === 'hover' || actualState === 'typing' || (actualState === 'default' && !isDisabled) || actualState === 'filledHover' || actualState === 'filled') {
    return (
      <button
        type="button"
        className={containerClassNames}
        onClick={onFocus}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        title={title}
        {...props}
      >
        <div className={inputClassNames}>
          <div className={inputInnerClassNames}>
            {getSearchIcon()}
            {showPlaceholder ? (
              <span className={styles.placeholder}>{placeholder}</span>
            ) : (
              <span className={styles.value}>{displayValue}</span>
            )}
            {(actualState === 'focused' || actualState === 'typing') && (
              <span className={`${styles.cursor} ${isTyping ? styles.cursorTyping : ''}`}>|</span>
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

export default Search;

