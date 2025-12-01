import React, { useState } from 'react';
import './ItemRow.css';

export type ItemRowState = 'default' | 'hover' | 'selected' | 'disabled' | 'danger';

export interface ItemRowProps {
  label: string;
  bodyText?: string;
  state?: ItemRowState;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  infoIcon?: React.ReactNode;
  checkbox?: boolean;
  checked?: boolean;
  onCheckboxChange?: (checked: boolean) => void;
  radio?: boolean;
  radioSelected?: boolean;
  onRadioChange?: (selected: boolean) => void;
  onClick?: () => void;
  onHover?: () => void;
  className?: string;
  'aria-label'?: string;
}

const ItemRow: React.FC<ItemRowProps> = ({
  label,
  bodyText,
  state = 'default',
  leftIcon,
  rightIcon,
  infoIcon,
  checkbox = false,
  checked = false,
  onCheckboxChange,
  radio = false,
  radioSelected = false,
  onRadioChange,
  onClick,
  onHover,
  className = '',
  'aria-label': ariaLabel,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const currentState = state === 'default' && isHovered ? 'hover' : state;

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (onHover) {
      onHover();
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onCheckboxChange) {
      onCheckboxChange(e.target.checked);
    }
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onRadioChange) {
      onRadioChange(e.target.checked);
    }
  };

  return (
    <div
      className={`item-row item-row-${currentState} ${className}`}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label={ariaLabel || label}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick && state !== 'disabled' ? 0 : undefined}
      {...props}
    >
      {infoIcon && (
        <div className="item-row-info-icon" aria-hidden="true">
          {infoIcon}
        </div>
      )}
      {leftIcon && (
        <div className="item-row-left-icon" aria-hidden="true">
          {leftIcon}
        </div>
      )}
      <div className="item-row-content">
        <div className="item-row-label">{label}</div>
        {bodyText && <div className="item-row-body">{bodyText}</div>}
      </div>
      {rightIcon && (
        <div className="item-row-right-icon" aria-hidden="true">
          {rightIcon}
        </div>
      )}
      {checkbox && (
        <div className="item-row-checkbox-container">
          <input
            type="checkbox"
            className="item-row-checkbox"
            checked={checked}
            onChange={handleCheckboxChange}
            disabled={state === 'disabled'}
            aria-label={`${label} checkbox`}
          />
        </div>
      )}
      {radio && (
        <div className="item-row-radio-container">
          <input
            type="radio"
            className="item-row-radio"
            checked={radioSelected}
            onChange={handleRadioChange}
            disabled={state === 'disabled'}
            aria-label={`${label} radio`}
          />
        </div>
      )}
    </div>
  );
};

export default ItemRow;

