import React, { useState } from 'react';
import './CategoriesDropdown.css';

export interface Chip {
  id: string;
  label: string;
  onRemove?: () => void;
}

export interface CategoryItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  radioSelected?: boolean;
  onRadioChange?: (selected: boolean) => void;
  onClick?: () => void;
}

export interface Category {
  id: string;
  title: string;
  items: CategoryItem[];
  defaultExpanded?: boolean;
}

export interface CategoriesDropdownProps {
  chips?: Chip[];
  categories: Category[];
  searchPlaceholder?: string;
  onChipRemove?: (chipId: string) => void;
  onSearch?: (value: string) => void;
  onCancel?: () => void;
  onApply?: () => void;
  className?: string;
  'aria-label'?: string;
}

const CategoriesDropdown: React.FC<CategoriesDropdownProps> = ({
  chips = [],
  categories,
  searchPlaceholder = 'Search...',
  onChipRemove,
  onSearch,
  onCancel,
  onApply,
  className = '',
  'aria-label': ariaLabel,
  ...props
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>(
    categories.reduce((acc, cat) => {
      acc[cat.id] = cat.defaultExpanded !== false;
      return acc;
    }, {} as Record<string, boolean>)
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleCategoryToggle = (categoryId: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
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

  const handleRadioChange = (item: CategoryItem, checked: boolean) => {
    if (item.onRadioChange) {
      item.onRadioChange(checked);
    }
  };

  const handleItemClick = (item: CategoryItem) => {
    if (item.onClick) {
      item.onClick();
    }
  };

  return (
    <div
      className={`categories-dropdown ${className}`}
      aria-label={ariaLabel || 'Categories dropdown'}
      {...props}
    >
      <div className="categories-dropdown-search">
        <span className="categories-dropdown-search-icon" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z"
              stroke="#5e6a76"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14 14L11.1 11.1"
              stroke="#5e6a76"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <input
          type="text"
          className="categories-dropdown-search-input"
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={handleSearchChange}
          aria-label="Search"
        />
      </div>
      {chips.length > 0 && (
        <div className="categories-dropdown-chip-list">
          {chips.map((chip: Chip) => (
            <div key={chip.id} className="categories-dropdown-chip">
              <span className="categories-dropdown-chip-label">{chip.label}</span>
              {chip.onRemove || onChipRemove ? (
                <button
                  type="button"
                  className="categories-dropdown-chip-remove"
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
      <div className="categories-dropdown-categories">
        {categories.map((category: Category) => (
          <div key={category.id} className="categories-dropdown-category">
            <div
              className="categories-dropdown-category-title"
              onClick={() => handleCategoryToggle(category.id)}
              role="button"
              tabIndex={0}
              aria-expanded={expandedCategories[category.id]}
            >
              <span className="categories-dropdown-category-title-text">{category.title}</span>
              <span className="categories-dropdown-category-title-chevron" aria-hidden="true">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  style={{
                    transform: expandedCategories[category.id] ? 'rotate(0deg)' : 'rotate(180deg)',
                  }}
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
            </div>
            {expandedCategories[category.id] && (
              <div className="categories-dropdown-category-items">
                {category.items.map((item: CategoryItem) => (
                  <div
                    key={item.id}
                    className="categories-dropdown-category-item"
                    onClick={() => handleItemClick(item)}
                    role="button"
                    tabIndex={0}
                  >
                    {item.icon && (
                      <div className="categories-dropdown-category-item-icon" aria-hidden="true">
                        {item.icon}
                      </div>
                    )}
                    <span className="categories-dropdown-category-item-label">{item.label}</span>
                    {item.onRadioChange !== undefined && (
                      <div className="categories-dropdown-category-item-radio-container">
                        <input
                          type="radio"
                          className="categories-dropdown-category-item-radio"
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
        ))}
      </div>
      {(onCancel || onApply) && (
        <div className="categories-dropdown-cta">
          {onCancel && (
            <button
              type="button"
              className="categories-dropdown-cancel"
              onClick={onCancel}
              aria-label="Cancel"
            >
              Cancel
            </button>
          )}
          {onApply && (
            <button
              type="button"
              className="categories-dropdown-apply"
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

export default CategoriesDropdown;

