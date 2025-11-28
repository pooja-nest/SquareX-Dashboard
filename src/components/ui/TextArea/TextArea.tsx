import React, { useState, useRef, useEffect } from 'react';
import './TextArea.css';

export type TextAreaState = 
  | 'default' 
  | 'hover' 
  | 'focused' 
  | 'typing' 
  | 'filledIn' 
  | 'filledInHover' 
  | 'error' 
  | 'disabled';

export interface TextAreaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  label?: string;
  description?: string;
  title?: string;
  error?: string;
  optionalIcon?: React.ReactNode;
  showDragHandle?: boolean;
  state?: TextAreaState;
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  description,
  title,
  error,
  optionalIcon,
  showDragHandle = false,
  state,
  className = '',
  disabled,
  value,
  onFocus,
  onBlur,
  onChange,
  ...props
}) => {
  const [internalState, setInternalState] = useState<TextAreaState>('default');
  const [isFocused, setIsFocused] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
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

  const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(false);
    setIsTyping(false);
    onBlur?.(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIsTyping(true);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 500);
    onChange?.(e);
  };

  const stateClass = `textarea-${currentState}`;

  return (
    <div className={`textarea-wrapper ${className}`}>
      {label && (
        <label 
          className={`textarea-label ${disabled ? 'textarea-label-disabled' : ''}`}
          htmlFor={props.id}
        >
          {label}
        </label>
      )}
      {description && (
        <p className={`textarea-description ${disabled ? 'textarea-description-disabled' : ''}`}>
          {description}
        </p>
      )}
      <div className={`textarea-container ${stateClass}`}>
        {title && (
          <div className="textarea-title-wrapper">
            {optionalIcon && (
              <span className="textarea-optional-icon" aria-hidden="true">
                {optionalIcon}
              </span>
            )}
            <h3 className="textarea-title">{title}</h3>
          </div>
        )}
        <div className="textarea-input-wrapper">
          {!title && optionalIcon && (
            <span className="textarea-optional-icon" aria-hidden="true">
              {optionalIcon}
            </span>
          )}
          <textarea
            ref={textareaRef}
            className="textarea-input"
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
          {showDragHandle && (
            <div className="textarea-drag-handle" aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <circle cx="2" cy="2" r="1" fill="#2f353b" opacity="0.3" />
                <circle cx="6" cy="2" r="1" fill="#2f353b" opacity="0.3" />
                <circle cx="10" cy="2" r="1" fill="#2f353b" opacity="0.3" />
                <circle cx="2" cy="6" r="1" fill="#2f353b" opacity="0.3" />
                <circle cx="6" cy="6" r="1" fill="#2f353b" opacity="0.3" />
                <circle cx="10" cy="6" r="1" fill="#2f353b" opacity="0.3" />
                <circle cx="2" cy="10" r="1" fill="#2f353b" opacity="0.3" />
                <circle cx="6" cy="10" r="1" fill="#2f353b" opacity="0.3" />
                <circle cx="10" cy="10" r="1" fill="#2f353b" opacity="0.3" />
              </svg>
            </div>
          )}
        </div>
      </div>
      {error && (
        <p id={`${props.id}-error`} className="textarea-error-message" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default TextArea;

