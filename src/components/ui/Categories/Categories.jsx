import React, { useState } from 'react';
import styles from './Categories.module.css';
import ItemRow from '../ItemRow/ItemRow';

const Categories = ({
  variant = 'single', // 'single' (Categories=1) or 'multiple' (Categories=2)
  chips = [],
  categories = [],
  onChipRemove,
  onCategoryToggle,
  onItemClick,
  onCancel,
  onApply,
  cancelLabel = 'Cancel',
  applyLabel = 'Apply',
  className = '',
  ...props
}) => {
  const [expandedCategories, setExpandedCategories] = useState(
    categories.reduce((acc, cat, index) => {
      acc[index] = cat.expanded !== undefined ? cat.expanded : true;
      return acc;
    }, {})
  );

  const handleCategoryToggle = (index) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
    if (onCategoryToggle) {
      onCategoryToggle(index, !expandedCategories[index]);
    }
  };

  const getSearchIcon = () => {
    return (
      <div className={styles.searchIcon}>
        <img src="/icons/search.svg" alt="Search" className={styles.searchIconImage} />
      </div>
    );
  };

  const renderChipList = () => {
    if (!chips || chips.length === 0) return null;

    // Split chips into rows (3 per row)
    const rows = [];
    for (let i = 0; i < chips.length; i += 3) {
      rows.push(chips.slice(i, i + 3));
    }

    return (
      <div className={styles.chipListContainer}>
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className={styles.chipListRow}>
            {row.map((chip, chipIndex) => (
              <div key={chipIndex} className={styles.chip}>
                <p className={styles.chipLabel}>{chip.label || 'Label'}</p>
                <button
                  type="button"
                  className={styles.chipRemove}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onChipRemove) {
                      onChipRemove(chip);
                    }
                  }}
                  aria-label="Remove chip"
                >
                  <img src="/icons/X.svg" alt="Remove" className={styles.chipIcon} />
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  const renderCategoryList = (category, categoryIndex) => {
    const isExpanded = expandedCategories[categoryIndex] !== false;

    return (
      <div key={categoryIndex} className={styles.categoryList}>
        <button
          type="button"
          className={styles.categoryTitle}
          onClick={() => handleCategoryToggle(categoryIndex)}
        >
          <p className={styles.categoryTitleText}>{category.title || 'Category'}</p>
          <div className={styles.chevronIcon}>
              <img
              src="/icons/chevron.svg"
              alt={isExpanded ? 'Collapse' : 'Expand'}
              className={`${styles.chevronImg} ${isExpanded ? styles.chevronUp : ''}`}
            />
          </div>
        </button>
        {isExpanded && (
          <div className={styles.categoryItems}>
            {(category.items || []).map((item, itemIndex) => (
              <div key={item.id || itemIndex} className={styles.categoryItemWrapper}>
                <ItemRow
                  label={item.label || 'Item'}
                  showLeftIcon={true}
                  showRightIcon={false}
                  hasCheckbox={false}
                  hasRadio={true}
                  checked={item.checked || false}
                  type={item.type || 'default'}
                  onClick={() => {
                    if (onItemClick) {
                      onItemClick(item, categoryIndex);
                    }
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const containerClassNames = [
    styles.container,
    styles[`variant_${variant}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClassNames} {...props}>
      <button
        type="button"
        className={styles.searchSection}
      >
        <div className={styles.searchInput}>
          {getSearchIcon()}
          <p className={styles.searchPlaceholder}>Search</p>
        </div>
        {renderChipList()}
      </button>

      <div className={styles.listsContainer}>
        {categories.map((category, index) => renderCategoryList(category, index))}
      </div>

      <div className={styles.actionsContainer}>
        <button
          type="button"
          className={styles.cancelButton}
          onClick={onCancel}
        >
          <p className={styles.cancelButtonText}>{cancelLabel}</p>
        </button>
        <button
          type="button"
          className={styles.applyButton}
          onClick={onApply}
        >
          <p className={styles.applyButtonText}>{applyLabel}</p>
        </button>
      </div>
    </div>
  );
};

export default Categories;

