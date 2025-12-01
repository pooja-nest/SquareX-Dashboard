import React, { useState } from 'react';
import './DropdownNestedColumn.css';

export interface Chip {
  id: string;
  label: string;
  onRemove?: () => void;
}

export interface DropdownItem {
  id: string;
  label: string;
  checked?: boolean;
  onCheckboxChange?: (checked: boolean) => void;
}

export interface DropdownNestedColumnProps {
  title: string;
  chips?: Chip[];
  items: DropdownItem[];
  searchPlaceholder?: string;
  defaultExpanded?: boolean;
  onClearAll?: () => void;
  onChipRemove?: (chipId: string) => void;
  onSearch?: (value: string) => void;
  className?: string;
  'aria-label'?: string;
}

const DropdownNestedColumn: React.FC<DropdownNestedColumnProps> = ({
  title,
  chips = [],
  items,
  searchPlaceholder = 'Search...',
  defaultExpanded = true,
  onClearAll,
  onChipRemove,
  onSearch,
  className = '',
  'aria-label': ariaLabel,
  ...props
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [searchValue, setSearchValue] = useState('');

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleChipRemove = (chipId: string) => {
    const chip = chips.find((c) => c.id === chipId);
    if (chip?.onRemove) {
      chip.onRemove();
    }
    if (onChipRemove) {
      onChipRemove(chipId);
    }
  };

  const handleCheckboxChange = (item: DropdownItem, checked: boolean) => {
    if (item.onCheckboxChange) {
      item.onCheckboxChange(checked);
    }
  };

  return (
    <div
      className={`dropdown-nested-column ${className}`}
      aria-label={ariaLabel || title}
      {...props}
    >
      <div
        className="dropdown-nested-column-title-frame"
        onClick={handleToggle}
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
      >
        <span className="dropdown-nested-column-title">{title}</span>
        <div className="dropdown-nested-column-title-actions">
          {onClearAll && (
            <button
              type="button"
              className="dropdown-nested-column-clear-all"
              onClick={(e) => {
                e.stopPropagation();
                onClearAll();
              }}
              aria-label="Clear all"
            >
              Clear all
            </button>
          )}
          <span className="dropdown-nested-column-chevron" aria-hidden="true">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              style={{ transform: isExpanded ? 'rotate(0deg)' : 'rotate(180deg)' }}
            >
              <path
                d="M5 7.5L10 12.5L15 7.5"
                stroke="#323232"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
      {isExpanded && (
        <div className="dropdown-nested-column-content">
          {chips.length > 0 && (
            <div className="dropdown-nested-column-chip-list">
              {chips.map((chip: Chip) => (
                <div key={chip.id} className="dropdown-nested-column-chip">
                  <span className="dropdown-nested-column-chip-label">{chip.label}</span>
                  {chip.onRemove || onChipRemove ? (
                    <button
                      type="button"
                      className="dropdown-nested-column-chip-remove"
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
          <div className="dropdown-nested-column-search">
            <span className="dropdown-nested-column-search-icon" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z"
                  stroke="#323232"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14 14L11.1 11.1"
                  stroke="#323232"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <input
              type="text"
              className="dropdown-nested-column-search-input"
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={handleSearchChange}
              aria-label="Search"
            />
          </div>
          <div className="dropdown-nested-column-item-list">
            {items.map((item: DropdownItem) => (
              <div key={item.id} className="dropdown-nested-column-item">
                <span className="dropdown-nested-column-item-label">{item.label}</span>
                <input
                  type="checkbox"
                  className="dropdown-nested-column-item-checkbox"
                  checked={item.checked || false}
                  onChange={(e) => handleCheckboxChange(item, e.target.checked)}
                  aria-label={`${item.label} checkbox`}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownNestedColumn;

