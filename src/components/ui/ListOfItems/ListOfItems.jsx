import React, { useState } from 'react';
import ItemRow from '../ItemRow/ItemRow';
import styles from './ListOfItems.module.css';

const ListOfItems = ({
  open = true,
  title = 'Category',
  type = 'Default',
  withTitle = false,
  items = [],
  onItemClick,
  className = '',
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(open);

  const normalizeType = (typeName) => {
    if (!typeName) return 'default';
    const normalized = typeName.toLowerCase();
    if (normalized === 'variant2') return 'variant2';
    return 'default';
  };

  const actualType = normalizeType(type);
  const showTitle = withTitle && actualType === 'variant2';

  const defaultItems = items.length > 0 
    ? items 
    : [
        { label: 'Item', id: '1' },
        { label: 'Item', id: '2' },
        { label: 'Item', id: '3' },
        { label: 'Item', id: '4' },
        { label: 'Item', id: '5' },
      ];

  const containerClassNames = [
    styles.listOfItems,
    styles[`type_${actualType}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleTitleClick = () => {
    setIsOpen(!isOpen);
  };

  if (actualType === 'variant2' && showTitle) {
    return (
      <div className={containerClassNames} {...props}>
        <button 
          className={styles.titleButton}
          onClick={handleTitleClick}
          type="button"
        >
          <p className={styles.titleText}>{title}</p>
          <div className={styles.chevronIcon}>
            <img 
              src="/icons/chevron.svg" 
              alt="Chevron" 
              className={styles.chevronImg}
            />
          </div>
        </button>
        {isOpen && (
          <div className={styles.items}>
            {defaultItems.map((item, index) => (
              <ItemRow
                key={item.id || index}
                label={item.label}
                showLeftIcon={true}
                showRightIcon={false}
                hasCheckbox={false}
                hasRadio={item.hasRadio || false}
                type={item.type || 'Default'}
                onClick={() => {
                  if (onItemClick) onItemClick(item);
                }}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={containerClassNames} {...props}>
      <div className={styles.items}>
        {defaultItems.map((item, index) => (
          <ItemRow
            key={item.id || index}
            label={item.label}
            showLeftIcon={true}
            showRightIcon={false}
            hasCheckbox={false}
            hasRadio={false}
            type={item.type || 'Default'}
            onClick={() => {
              if (onItemClick) onItemClick(item);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ListOfItems;

