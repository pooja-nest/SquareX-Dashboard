import React, { useState, useRef, useEffect } from 'react';
import './Search.css';

export type SearchState = 
  | 'default' 
  | 'hover' 
  | 'focused' 
  | 'typing' 
  | 'filledIn' 
  | 'filledInHover' 
  | 'error' 
  | 'disabled';

export interface SearchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  error?: string;
  state?: SearchState;
  onSearch?: (value: string) => void;
}

const Search: React.FC<SearchProps> = ({
  error,
  state,
  className = '',
  disabled,
  value,
  onFocus,
  onBlur,
  onChange,
  onSearch,
  onKeyDown,
  ...props
}) => {
  const [internalState, setInternalState] = useState<SearchState>('default');
  const [isFocused, setIsFocused] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentState = state || internalState;
  const hasValue = Boolean(value);
  const hasError = Boolean(error);

  useEffect(() => {
    if (disabled) {
      setInternalState('disabled');
    } else if (hasError) {
      setInternalState('error');
    } else if (isFocused && isTyping) {
      setInternalState('typing');
    } else if (isFocused) {
      setInternalState('focused');
    } else if (hasValue) {
      setInternalState('filledIn');
    } else {
      setInternalState('default');
    }
  }, [disabled, hasError, isFocused, isTyping, hasValue]);

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    setIsTyping(false);
    onBlur?.(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsTyping(true);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 500);
    onChange?.(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch && value) {
      onSearch(String(value));
    }
    onKeyDown?.(e);
  };

  const stateClass = `search-${currentState}`;

  return (
    <div className={`search-wrapper ${className}`}>
      <div className={`search-container ${stateClass}`}>
        <div className="search-input-wrapper">
          <span className="search-icon" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M7 12C9.76142 12 12 9.76142 12 7C12 4.23858 9.76142 2 7 2C4.23858 2 2 4.23858 2 7C2 9.76142 4.23858 12 7 12Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14 14L10.5 10.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <input
            ref={inputRef}
            type="search"
            className="search-input"
            disabled={disabled}
            value={value}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            aria-invalid={hasError}
            aria-describedby={error ? `${props.id}-error` : undefined}
            {...props}
          />
        </div>
      </div>
      {error && (
        <p id={`${props.id}-error`} className="search-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default Search;

