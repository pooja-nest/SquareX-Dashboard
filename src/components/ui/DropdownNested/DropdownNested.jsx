import React from 'react';
import DropdownNestedColumn from '../DropdownNestedColumn/DropdownNestedColumn';
import styles from './DropdownNested.module.css';

const DropdownNested = ({
  leftColumn = {
    title: 'Select a Member',
    chips: [],
    items: [],
  },
  rightColumn = {
    title: 'Select a Group',
    chips: [],
    items: [],
  },
  onLeftClearAll,
  onRightClearAll,
  onLeftChipRemove,
  onRightChipRemove,
  onLeftItemClick,
  onRightItemClick,
  onCancel,
  onApply,
  className = '',
  ...props
}) => {
  // Default chips for left column
  const leftChips = leftColumn.chips.length > 0 
    ? leftColumn.chips 
    : [
        { label: 'Label', id: '1' },
        { label: 'Label', id: '2' },
        { label: 'Label', id: '3' },
        { label: 'Label', id: '4' },
      ];

  // Default chips for right column
  const rightChips = rightColumn.chips.length > 0 
    ? rightColumn.chips 
    : [
        { label: 'Label', id: '1' },
        { label: 'Label', id: '2' },
        { label: 'Label', id: '3' },
        { label: 'Label', id: '4' },
      ];

  // Default items for left column
  const leftItems = leftColumn.items.length > 0 
    ? leftColumn.items 
    : [
        { label: 'Item', id: '1', hasCheckbox: true, checked: false },
        { label: 'Item', id: '2', hasCheckbox: true, checked: true },
        { label: 'Item', id: '3', hasCheckbox: true, checked: true },
        { label: 'Item', id: '4', hasCheckbox: true, checked: false },
        { label: 'Item', id: '5', hasCheckbox: true, checked: false },
      ];

  // Default items for right column
  const rightItems = rightColumn.items.length > 0 
    ? rightColumn.items 
    : [
        { label: 'Item', id: '1', hasCheckbox: true, checked: true },
        { label: 'Item', id: '2', hasCheckbox: true, checked: false },
        { label: 'Item', id: '3', hasCheckbox: true, checked: true },
        { label: 'Item', id: '4', hasCheckbox: true, checked: false },
        { label: 'Item', id: '5', hasCheckbox: true, checked: false },
      ];

  const containerClassNames = [
    styles.dropdownNested,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClassNames} {...props}>
      <div className={styles.columns}>
        <div className={styles.column}>
          <DropdownNestedColumn
            title={leftColumn.title}
            expanded={true}
            chips={leftChips}
            items={leftItems}
            onClearAll={onLeftClearAll}
            onChipRemove={onLeftChipRemove}
            onItemClick={onLeftItemClick}
          />
        </div>
        <div className={styles.column}>
          <DropdownNestedColumn
            title={rightColumn.title}
            expanded={true}
            chips={rightChips}
            items={rightItems}
            onClearAll={onRightClearAll}
            onChipRemove={onRightChipRemove}
            onItemClick={onRightItemClick}
          />
        </div>
      </div>
      <div className={styles.ctas}>
        <button 
          className={styles.cancelButton}
          onClick={onCancel}
          type="button"
        >
          <p className={styles.cancelText}>Cancel</p>
        </button>
        <button 
          className={styles.applyButton}
          onClick={onApply}
          type="button"
        >
          <p className={styles.applyText}>Apply</p>
        </button>
      </div>
    </div>
  );
};

export default DropdownNested;

