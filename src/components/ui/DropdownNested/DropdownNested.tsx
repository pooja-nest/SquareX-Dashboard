import React, { useState } from 'react';
import './DropdownNested.css';

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

export interface DropdownColumn {
  id: string;
  title: string;
  chips?: Chip[];
  items: DropdownItem[];
  searchPlaceholder?: string;
  defaultExpanded?: boolean;
  onClearAll?: () => void;
  onChipRemove?: (chipId: string) => void;
  onSearch?: (value: string) => void;
}

export interface DropdownNestedProps {
  columns: DropdownColumn[];
  onCancel?: () => void;
  onApply?: () => void;
  className?: string;
  'aria-label'?: string;
}

const DropdownNested: React.FC<DropdownNestedProps> = ({
  columns,
  onCancel,
  onApply,
  className = '',
  'aria-label': ariaLabel,
  ...props
}) => {
  const [expandedColumns, setExpandedColumns] = useState<Record<string, boolean>>(
    columns.reduce((acc, col) => {
      acc[col.id] = col.defaultExpanded !== false;
      return acc;
    }, {} as Record<string, boolean>)
  );

  const handleColumnToggle = (columnId: string) => {
    setExpandedColumns((prev) => ({
      ...prev,
      [columnId]: !prev[columnId],
    }));
  };

  const handleChipRemove = (columnId: string, chipId: string) => {
    const column = columns.find((c) => c.id === columnId);
    if (column) {
      const chip = column.chips?.find((c) => c.id === chipId);
      if (chip?.onRemove) {
        chip.onRemove();
      }
      if (column.onChipRemove) {
        column.onChipRemove(chipId);
      }
    }
  };

  const handleCheckboxChange = (columnId: string, item: DropdownItem, checked: boolean) => {
    if (item.onCheckboxChange) {
      item.onCheckboxChange(checked);
    }
  };

  return (
    <div
      className={`dropdown-nested ${className}`}
      aria-label={ariaLabel || 'Dropdown nested'}
      {...props}
    >
      <div className="dropdown-nested-columns">
        {columns.map((column: DropdownColumn) => (
          <div key={column.id} className="dropdown-nested-column-wrapper">
            <div
              className="dropdown-nested-column-title-frame"
              onClick={() => handleColumnToggle(column.id)}
              role="button"
              tabIndex={0}
              aria-expanded={expandedColumns[column.id]}
            >
              <span className="dropdown-nested-column-title">{column.title}</span>
              <div className="dropdown-nested-column-title-actions">
                {column.onClearAll && (
                  <button
                    type="button"
                    className="dropdown-nested-column-clear-all"
                    onClick={(e) => {
                      e.stopPropagation();
                      column.onClearAll?.();
                    }}
                    aria-label={`Clear all ${column.title}`}
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
                    style={{
                      transform: expandedColumns[column.id] ? 'rotate(0deg)' : 'rotate(180deg)',
                    }}
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
            {expandedColumns[column.id] && (
              <div className="dropdown-nested-column-content">
                {column.chips && column.chips.length > 0 && (
                  <div className="dropdown-nested-column-chip-list">
                    {column.chips.map((chip: Chip) => (
                      <div key={chip.id} className="dropdown-nested-column-chip">
                        <span className="dropdown-nested-column-chip-label">{chip.label}</span>
                        {chip.onRemove || column.onChipRemove ? (
                          <button
                            type="button"
                            className="dropdown-nested-column-chip-remove"
                            onClick={() => handleChipRemove(column.id, chip.id)}
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
                    placeholder={column.searchPlaceholder || 'Search...'}
                    onChange={(e) => column.onSearch?.(e.target.value)}
                    aria-label={`Search ${column.title}`}
                  />
                </div>
                <div className="dropdown-nested-column-item-list">
                  {column.items.map((item: DropdownItem) => (
                    <div key={item.id} className="dropdown-nested-column-item">
                      <span className="dropdown-nested-column-item-label">{item.label}</span>
                      <input
                        type="checkbox"
                        className="dropdown-nested-column-item-checkbox"
                        checked={item.checked || false}
                        onChange={(e) => handleCheckboxChange(column.id, item, e.target.checked)}
                        aria-label={`${item.label} checkbox`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {(onCancel || onApply) && (
        <div className="dropdown-nested-cta">
          {onCancel && (
            <button
              type="button"
              className="dropdown-nested-cancel"
              onClick={onCancel}
              aria-label="Cancel"
            >
              Cancel
            </button>
          )}
          {onApply && (
            <button
              type="button"
              className="dropdown-nested-apply"
              onClick={onApply}
              aria-label="Apply"
            >
              Apply
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default DropdownNested;

