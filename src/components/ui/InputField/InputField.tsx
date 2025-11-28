import React, { useState, useRef, useEffect } from 'react';
import './InputField.css';

export type InputFieldState = 
  | 'default' 
  | 'hover' 
  | 'focused' 
  | 'typing' 
  | 'filledIn' 
  | 'filledInHover' 
  | 'error' 
  | 'disabled';

export interface Chip {
  id: string;
  label: string;
  onRemove?: (id: string) => void;
}

export interface InputFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  description?: string;
  error?: string;
  optionalIcon?: React.ReactNode;
  chips?: Chip[];
  onChipRemove?: (chipId: string) => void;
  state?: InputFieldState;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  description,
  error,
  optionalIcon,
  chips = [],
  onChipRemove,
  state,
  className = '',
  disabled,
  value,
  onFocus,
  onBlur,
  onChange,
  ...props
}) => {
  const [internalState, setInternalState] = useState<InputFieldState>('default');
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

  const handleChipRemove = (chipId: string) => {
    onChipRemove?.(chipId);
  };

  const stateClass = `input-field-${currentState}`;
  const hasChips = chips.length > 0;

  return (
    <div className={`input-field-wrapper ${className}`}>
      {label && (
        <label 
          className={`input-field-label ${disabled ? 'input-field-label-disabled' : ''}`}
          htmlFor={props.id}
        >
          {label}
        </label>
      )}
      {description && (
        <p className={`input-field-description ${disabled ? 'input-field-description-disabled' : ''}`}>
          {description}
        </p>
      )}
      <div className={`input-field-container ${stateClass}`}>
        {hasChips && (
          <div className="input-field-chips">
            {chips.map((chip: Chip) => (
              <div key={chip.id} className="input-field-chip">
                <span className="input-field-chip-label">{chip.label}</span>
                {chip.onRemove || onChipRemove ? (
                  <button
                    type="button"
                    className="input-field-chip-remove"
                    onClick={() => handleChipRemove(chip.id)}
                    aria-label={`Remove ${chip.label}`}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5"
                        stroke="#5e6a76"
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
        <div className="input-field-input-wrapper">
          {optionalIcon && (
            <span className="input-field-optional-icon" aria-hidden="true">
              {optionalIcon}
            </span>
          )}
          <input
            ref={inputRef}
            type="text"
            className="input-field-input"
            disabled={disabled}
            value={value}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            aria-invalid={hasError}
            aria-describedby={
              error ? `${props.id}-error` : description ? `${props.id}-description` : undefined
            }
            {...props}
          />
        </div>
      </div>
      {error && (
        <p id={`${props.id}-error`} className="input-field-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default InputField;

