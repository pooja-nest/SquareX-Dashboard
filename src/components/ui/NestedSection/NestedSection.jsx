import React from 'react';
import styles from './NestedSection.module.css';
import Dropdown from '../Dropdown/Dropdown';

const NestedSection = ({
  canDrag = true,
  dropdowns = [],
  onMoreClick,
  className = '',
  ...props
}) => {
  // Default dropdowns if none provided
  const defaultDropdowns = [
    { label: 'Policy ID', placeholder: 'Policy ID', value: '', hasLabel: true, hasDescription: false },
    { label: '', placeholder: '', value: 'is', hasLabel: false, hasDescription: false, state: 'selected', type: 'small' },
    { label: '', placeholder: '', value: 'Operator', hasLabel: false, hasDescription: false, state: 'selected', type: 'small' },
    { label: 'Policy ID', placeholder: 'Enter value', value: '', hasLabel: true, hasDescription: false },
  ];

  const displayDropdowns = dropdowns.length > 0 ? dropdowns : defaultDropdowns;

  // Get more vertical icon
  const getMoreVerticalIcon = () => {
    return (
      <div className={styles.moreIconWrapper}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="6" r="1.5" fill="#323232"/>
          <circle cx="12" cy="12" r="1.5" fill="#323232"/>
          <circle cx="12" cy="18" r="1.5" fill="#323232"/>
        </svg>
      </div>
    );
  };

  // Get drag icon
  const getDragIcon = () => {
    if (!canDrag) return null;
    return (
      <div className={styles.dragHandle}>
        <img src="/icons/dot.svg" alt="Drag" className={styles.dragIcon} />
      </div>
    );
  };

  const containerClassNames = [
    styles.container,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Split dropdowns: first, middle group (2), last
  const firstDropdown = displayDropdowns[0];
  const middleDropdowns = displayDropdowns.slice(1, 3);
  const lastDropdown = displayDropdowns[3];

  return (
    <div className={containerClassNames} {...props}>
      {getDragIcon()}
      <div className={styles.content}>
        <div className={styles.dropdowns}>
          {/* First dropdown */}
          {firstDropdown && (
            <Dropdown
              key="first"
              label={firstDropdown.label}
              description={firstDropdown.description}
              value={firstDropdown.value}
              placeholder={firstDropdown.placeholder}
              hasLabel={firstDropdown.hasLabel}
              hasDescription={firstDropdown.hasDescription || false}
              hasError={false}
              hasChips={false}
              type={firstDropdown.type || 'medium'}
              state={firstDropdown.state || 'default'}
              disabled={firstDropdown.disabled || false}
            />
          )}
          {/* Middle group of 2 dropdowns with 16px gap */}
          {middleDropdowns.length > 0 && (
            <div className={styles.middleGroup}>
              {middleDropdowns.map((dropdown, index) => (
                <Dropdown
                  key={`middle-${index}`}
                  label={dropdown.label}
                  description={dropdown.description}
                  value={dropdown.value}
                  placeholder={dropdown.placeholder}
                  hasLabel={dropdown.hasLabel}
                  hasDescription={dropdown.hasDescription || false}
                  hasError={false}
                  hasChips={false}
                  type={dropdown.type || 'medium'}
                  state={dropdown.state || 'default'}
                  disabled={dropdown.disabled || false}
                />
              ))}
            </div>
          )}
          {/* Last dropdown */}
          {lastDropdown && (
            <Dropdown
              key="last"
              label={lastDropdown.label}
              description={lastDropdown.description}
              value={lastDropdown.value}
              placeholder={lastDropdown.placeholder}
              hasLabel={lastDropdown.hasLabel}
              hasDescription={lastDropdown.hasDescription || false}
              hasError={false}
              hasChips={false}
              type={lastDropdown.type || 'medium'}
              state={lastDropdown.state || 'default'}
              disabled={lastDropdown.disabled || false}
            />
          )}
        </div>
        <button
          type="button"
          className={styles.moreButton}
          onClick={onMoreClick}
          aria-label="More options"
        >
          {getMoreVerticalIcon()}
        </button>
      </div>
    </div>
  );
};

export default NestedSection;

