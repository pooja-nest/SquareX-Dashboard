import React, { useState, useRef, useEffect } from 'react';
import './Dropdown.css';

export type DropdownVariant = 'medium' | 'small';

export type DropdownState = 
  | 'default' 
  | 'hover' 
  | 'focused' 
  | 'selected' 
  | 'error' 
  | 'disabled';

export interface Chip {
  id: string;
  label: string;
  onRemove?: (id: string) => void;
}

export interface DropdownOption {
  value: string;
  label: string;
}

export interface DropdownProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  variant?: DropdownVariant;
  label?: string;
  description?: string;
  error?: string;
  chips?: Chip[];
  onChipRemove?: (chipId: string) => void;
  options: DropdownOption[];
  state?: DropdownState;
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  variant = 'medium',
  label,
  description,
  error,
  chips = [],
  onChipRemove,
  options,
  state,
  className = '',
  disabled,
  value,
  isOpen: controlledIsOpen,
  onToggle,
  onChange,
  onFocus,
  onBlur,
  ...props
}) => {
  const [internalState, setInternalState] = useState<DropdownState>('default');
  const [isFocused, setIsFocused] = useState(false);
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const hasValue = Boolean(value);
  const hasError = Boolean(error);
  const hasChips = chips.length > 0;

  useEffect(() => {
    if (disabled) {
      setInternalState('disabled');
    } else if (hasError) {
      setInternalState('error');
    } else if (hasValue) {
      setInternalState('selected');
    } else if (isFocused || isOpen) {
      setInternalState('focused');
    } else {
      setInternalState('default');
    }
  }, [disabled, hasError, hasValue, isFocused, isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        if (controlledIsOpen === undefined) {
          setInternalIsOpen(false);
        }
        onToggle?.(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, controlledIsOpen, onToggle]);

  const handleFocus = (e: React.FocusEvent<HTMLSelectElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e);
  };

  const handleToggle = () => {
    if (disabled) return;
    const newIsOpen = !isOpen;
    if (controlledIsOpen === undefined) {
      setInternalIsOpen(newIsOpen);
    }
    onToggle?.(newIsOpen);
  };

  const handleChipRemove = (chipId: string) => {
    onChipRemove?.(chipId);
  };

  const currentState = state || internalState;
  const stateClass = `dropdown-${currentState}`;
  const variantClass = `dropdown-${variant}`;
  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className={`dropdown-wrapper ${className}`}>
      {label && (
        <label 
          className={`dropdown-label ${disabled ? 'dropdown-label-disabled' : ''}`}
          htmlFor={props.id}
        >
          {label}
        </label>
      )}
      {description && (
        <p className={`dropdown-description ${disabled ? 'dropdown-description-disabled' : ''}`}>
          {description}
        </p>
      )}
      <div 
        ref={dropdownRef}
        className={`dropdown-container ${variantClass} ${stateClass}`}
        onClick={handleToggle}
      >
        {hasChips && (
          <div className="dropdown-chips">
            {chips.map((chip: Chip) => (
              <div key={chip.id} className="dropdown-chip">
                <span className="dropdown-chip-label">{chip.label}</span>
                {chip.onRemove || onChipRemove ? (
                  <button
                    type="button"
                    className="dropdown-chip-remove"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleChipRemove(chip.id);
                    }}
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
        <div className="dropdown-select-wrapper">
          <select
            className="dropdown-select"
            disabled={disabled}
            value={value}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            aria-invalid={hasError}
            aria-describedby={
              error ? `${props.id}-error` : description ? `${props.id}-description` : undefined
            }
            aria-expanded={isOpen}
            {...props}
          >
            {!hasValue && (
              <option value="" disabled>
                Select an option
              </option>
            )}
            {options.map((option: DropdownOption) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <span 
            className={`dropdown-chevron ${isOpen ? 'dropdown-chevron-open' : ''}`}
            aria-hidden="true"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M4 6L8 10L12 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
      {error && (
        <p id={`${props.id}-error`} className="dropdown-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default Dropdown;

