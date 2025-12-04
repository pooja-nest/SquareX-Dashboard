import React, { useState } from 'react';
import ItemRow from '../ItemRow/ItemRow';
import styles from './DropdownMaster.module.css';

const DropdownMaster = ({
  categories = [],
  onItemClick,
  onCategoryToggle,
  className = '',
  ...props
}) => {
  const [expandedCategories, setExpandedCategories] = useState(
    categories.reduce((acc, cat) => {
      if (cat.expandable && cat.expanded) {
        acc[cat.id] = true;
      }
      return acc;
    }, {})
  );

  const handleCategoryToggle = (categoryId) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
    if (onCategoryToggle) {
      onCategoryToggle(categoryId);
    }
  };

  const handleItemClick = (item) => {
    if (onItemClick) {
      onItemClick(item);
    }
  };

  const containerClassNames = [
    styles.dropdownMaster,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClassNames} {...props}>
      <div className={styles.lists}>
        {categories.map((category) => {
          if (!category.expandable) {
            // Top-level non-expandable item (e.g., "All lists")
            return (
              <div key={category.id} className={styles.listItem}>
                <button
                  className={styles.itemRowButton}
                  onClick={() => handleItemClick(category)}
                  type="button"
                >
                  <div className={styles.iconsAndText}>
                    <div className={styles.text}>
                      <p className={styles.itemText}>{category.label}</p>
                    </div>
                  </div>
                </button>
              </div>
            );
          }

          // Expandable category
          const isExpanded = expandedCategories[category.id] ?? category.expanded ?? false;

          return (
            <div key={category.id} className={styles.listItem}>
              <button
                className={styles.listTitle}
                onClick={() => handleCategoryToggle(category.id)}
                type="button"
              >
                <p className={styles.categoryTitle}>{category.label}</p>
                <div className={styles.chevronContainer}>
                  <div
                    className={styles.chevronIcon}
                    style={{
                      transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease',
                    }}
                  >
                    <img
                      src="/icons/chevron.svg"
                      alt="Chevron"
                      className={styles.chevronImg}
                    />
                  </div>
                </div>
              </button>
              {isExpanded && (
                <div className={styles.items}>
                  {category.items.map((item) => (
                    <button
                      key={item.id}
                      className={styles.itemRowButton}
                      onClick={() => handleItemClick(item)}
                      type="button"
                    >
                      <div className={styles.iconsAndText}>
                        {item.icon && (
                          <div className={styles.iconContainer}>
                            <div className={styles.iconWrapper}>
                              <img
                                src={item.icon}
                                alt=""
                                className={styles.itemIcon}
                              />
                            </div>
                          </div>
                        )}
                        <div className={styles.text}>
                          <p className={styles.itemText}>{item.label}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DropdownMaster;

