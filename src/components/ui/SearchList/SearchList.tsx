import React, { useState, useRef, useEffect } from 'react';
import './SearchList.css';

export type SearchListVariant = 'type1' | 'type2';

export type SearchListState = 'default' | 'hover' | 'focused' | 'typing';

export interface Chip {
  id: string;
  label: string;
  onRemove?: (id: string) => void;
}

export interface SearchListProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: SearchListVariant;
  state?: SearchListState;
  chips?: Chip[];
  onChipRemove?: (chipId: string) => void;
}

const SearchList: React.FC<SearchListProps> = ({
  variant = 'type1',
  state,
  chips = [],
  onChipRemove,
  className = '',
  disabled,
  value,
  onFocus,
  onBlur,
  onChange,
  ...props
}) => {
  const [internalState, setInternalState] = useState<SearchListState>('default');
  const [isFocused, setIsFocused] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentState = state || internalState;
  const hasValue = Boolean(value);
  const hasChips = chips.length > 0;

  useEffect(() => {
    if (disabled) {
      setInternalState('default');
    } else if (isFocused && isTyping) {
      setInternalState('typing');
    } else if (isFocused) {
      setInternalState('focused');
    } else {
      setInternalState('default');
    }
  }, [disabled, isFocused, isTyping]);

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

  const handleChipRemove = (chipId: string) => {
    onChipRemove?.(chipId);
  };

  const variantClass = `search-list-${variant}`;
  const stateClass = `search-list-${currentState}`;

  return (
    <div className={`search-list-wrapper ${variantClass} ${className}`}>
      {variant === 'type2' && hasChips && (
        <div className="search-list-chips">
          {chips.map((chip: Chip) => (
            <div key={chip.id} className="search-list-chip">
              <span className="search-list-chip-label">{chip.label}</span>
              {chip.onRemove || onChipRemove ? (
                <button
                  type="button"
                  className="search-list-chip-remove"
                  onClick={() => handleChipRemove(chip.id)}
                  aria-label={`Remove ${chip.label}`}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5"
                      stroke="#323232"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              ) : null}
            </div>
          ))}
        </div>
      )}
      <div className={`search-list-container ${stateClass}`}>
        <div className="search-list-input-wrapper">
          <span className="search-list-icon" aria-hidden="true">
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
            className="search-list-input"
            disabled={disabled}
            value={value}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            {...props}
          />
        </div>
      </div>
      {variant === 'type1' && hasChips && (
        <div className="search-list-chips">
          {chips.map((chip: Chip) => (
            <div key={chip.id} className="search-list-chip">
              <span className="search-list-chip-label">{chip.label}</span>
              {chip.onRemove || onChipRemove ? (
                <button
                  type="button"
                  className="search-list-chip-remove"
                  onClick={() => handleChipRemove(chip.id)}
                  aria-label={`Remove ${chip.label}`}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5"
                      stroke="#323232"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchList;

