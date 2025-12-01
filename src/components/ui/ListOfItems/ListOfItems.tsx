import React, { useState } from 'react';
import './ListOfItems.css';

export interface ListItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  nested?: boolean;
  radioSelected?: boolean;
  onRadioChange?: (selected: boolean) => void;
  onClick?: () => void;
}

export type ListOfItemsVariant = 'default' | 'variant2';

export interface ListOfItemsProps {
  title?: string;
  items: ListItem[];
  variant?: ListOfItemsVariant;
  defaultExpanded?: boolean;
  onItemClick?: (itemId: string) => void;
  className?: string;
  'aria-label'?: string;
}

const ListOfItems: React.FC<ListOfItemsProps> = ({
  title,
  items,
  variant = 'default',
  defaultExpanded = true,
  onItemClick,
  className = '',
  'aria-label': ariaLabel,
  ...props
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const handleToggle = () => {
    if (variant === 'variant2') {
      setIsExpanded(!isExpanded);
    }
  };

  const handleItemClick = (item: ListItem) => {
    if (item.onClick) {
      item.onClick();
    }
    if (onItemClick) {
      onItemClick(item.id);
    }
  };

  const handleRadioChange = (item: ListItem, checked: boolean) => {
    if (item.onRadioChange) {
      item.onRadioChange(checked);
    }
  };

  return (
    <div
      className={`list-of-items list-of-items-${variant} ${className}`}
      aria-label={ariaLabel || 'List of items'}
      {...props}
    >
      {title && (
        <div
          className={`list-of-items-title ${variant === 'variant2' ? 'list-of-items-title-expandable' : ''} ${isExpanded ? 'list-of-items-title-expanded' : ''}`}
          onClick={variant === 'variant2' ? handleToggle : undefined}
          role={variant === 'variant2' ? 'button' : undefined}
          tabIndex={variant === 'variant2' ? 0 : undefined}
          aria-expanded={variant === 'variant2' ? isExpanded : undefined}
        >
          <span className="list-of-items-title-text">{title}</span>
          {variant === 'variant2' && (
            <span className="list-of-items-title-chevron" aria-hidden="true">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                style={{ transform: isExpanded ? 'rotate(0deg)' : 'rotate(180deg)' }}
              >
                <path
                  d="M4 6L8 10L12 6"
                  stroke="#2f353b"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          )}
        </div>
      )}
      {(variant === 'default' || isExpanded) && (
        <div className="list-of-items-list">
          {items.map((item: ListItem) => (
            <div
              key={item.id}
              className={`list-of-items-item ${item.nested ? 'list-of-items-item-nested' : ''}`}
              onClick={() => handleItemClick(item)}
              role="button"
              tabIndex={0}
            >
              {item.icon && (
                <div className="list-of-items-item-icon" aria-hidden="true">
                  {item.icon}
                </div>
              )}
              <span className="list-of-items-item-label">{item.label}</span>
              {item.onRadioChange !== undefined && (
                <div className="list-of-items-item-radio-container">
                  <input
                    type="radio"
                    className="list-of-items-item-radio"
                    checked={item.radioSelected || false}
                    onChange={(e) => handleRadioChange(item, e.target.checked)}
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`${item.label} radio`}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListOfItems;

