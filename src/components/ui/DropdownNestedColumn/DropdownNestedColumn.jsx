import React, { useState } from 'react';
import Chip from '../Chip/Chip';
import ItemRow from '../ItemRow/ItemRow';
import styles from './DropdownNestedColumn.module.css';

const DropdownNestedColumn = ({
  title = 'Title',
  expanded = true,
  chips = [],
  items = [],
  onClearAll,
  onChipRemove,
  onItemClick,
  className = '',
  ...props
}) => {
  const [isExpanded, setIsExpanded] = useState(expanded);

  // Default chips if none provided
  const defaultChips = [
    { label: 'Label', id: '1' },
    { label: 'Label', id: '2' },
    { label: 'Label', id: '3' },
    { label: 'Label', id: '4' },
  ];

  // Default items if none provided
  const defaultItems = items.length > 0 
    ? items 
    : [
        { label: 'Item', id: '1', hasCheckbox: true, checked: false },
        { label: 'Item', id: '2', hasCheckbox: true, checked: false },
        { label: 'Item', id: '3', hasCheckbox: true, checked: false },
        { label: 'Item', id: '4', hasCheckbox: true, checked: false },
        { label: 'Item', id: '5', hasCheckbox: true, checked: false },
      ];

  const displayChips = chips.length > 0 ? chips : defaultChips;
  const displayItems = items.length > 0 ? items : defaultItems;

  const containerClassNames = [
    styles.dropdownNestedColumn,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleClearAll = (e) => {
    e.stopPropagation();
    if (onClearAll) {
      onClearAll();
    }
  };

  // Title and CTA section
  const titleAndCta = (
    <div className={styles.titleAndCta}>
      <p className={styles.titleText}>{title}</p>
      <button 
        className={styles.clearAllButton}
        onClick={handleClearAll}
        type="button"
      >
        <p className={styles.clearAllText}>Clear all</p>
      </button>
    </div>
  );

  // Render chevron icon
  const renderChevron = () => {
    return (
      <div className={styles.chevronContainer}>
        <div 
          className={styles.chevronIcon}
          style={{
            transform: isExpanded ? 'rotate(0deg)' : 'rotate(180deg)',
            transition: 'transform 0.2s ease'
          }}
        >
          <div className={styles.chevronIconInner}>
            <img 
              src="/icons/chevron.svg" 
              alt="Chevron" 
              className={styles.chevronImg}
            />
          </div>
        </div>
      </div>
    );
  };

  if (!isExpanded) {
    return (
      <div className={containerClassNames} {...props}>
        <div className={styles.titleFrame}>
          {titleAndCta}
          <button 
            className={styles.chevronButton}
            onClick={handleToggle}
            type="button"
          >
            {renderChevron()}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={containerClassNames} {...props}>
      <div className={styles.titleFrame}>
        {titleAndCta}
        <button 
          className={styles.chevronButton}
          onClick={handleToggle}
          type="button"
        >
          {renderChevron()}
        </button>
      </div>
      <div className={styles.dropdownWithSearch}>
        <div className={styles.dropdownContent}>
          <button className={styles.listSearchButton} type="button">
            <div className={styles.chipListSection}>
              <div className={styles.chipRow}>
                {displayChips.slice(0, 2).map((chip) => (
                  <Chip
                    key={chip.id || chip.label}
                    label={chip.label}
                    showRightIcon={true}
                    showLeftIcon={false}
                    state="default"
                    size="medium"
                    onRemove={() => {
                      if (onChipRemove) {
                        onChipRemove(chip);
                      }
                    }}
                  />
                ))}
              </div>
              <div className={styles.chipRow}>
                {displayChips.slice(2, 4).map((chip) => (
                  <Chip
                    key={chip.id || chip.label}
                    label={chip.label}
                    showRightIcon={true}
                    showLeftIcon={false}
                    state="default"
                    size="medium"
                    onRemove={() => {
                      if (onChipRemove) {
                        onChipRemove(chip);
                      }
                    }}
                  />
                ))}
              </div>
            </div>
            <div className={styles.searchInputSection}>
              <div className={styles.searchInput}>
                <div className={styles.searchIcon}>
                  <div className={styles.searchIconInner}>
                    <img 
                      src="/icons/search.svg" 
                      alt="Search" 
                      className={styles.searchIconImg}
                    />
                  </div>
                </div>
                <p className={styles.searchPlaceholder}>Search</p>
              </div>
            </div>
          </button>
          <div className={styles.itemsList}>
            <div className={styles.itemsContainer}>
              {displayItems.map((item, index) => (
                <ItemRow
                  key={item.id || index}
                  label={item.label}
                  showLeftIcon={false}
                  showRightIcon={false}
                  hasCheckbox={item.hasCheckbox || true}
                  hasRadio={false}
                  checked={item.checked || false}
                  type={item.type || 'Default'}
                  onClick={() => {
                    if (onItemClick) onItemClick(item);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropdownNestedColumn;

