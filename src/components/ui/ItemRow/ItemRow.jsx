import React from 'react';
import styles from './ItemRow.module.css';

const ItemRow = ({
  showLeftIcon = true,
  hasCheckbox = false,
  hasRadio = false,
  checked = false,
  chooseLeftIcon = null,
  label = 'Item',
  showBody = false,
  body = 'Body',
  showInfo = false,
  showRightIcon = false,
  chooseRightIcon = null,
  type = 'Default',
  onClick,
  className = '',
  ...props
}) => {
  const normalizeType = (typeName) => {
    if (!typeName) return 'default';
    const normalized = typeName.toLowerCase();
    if (normalized === 'hover') return 'hover';
    if (normalized === 'disabled') return 'disabled';
    if (normalized === 'selected') return 'selected';
    if (normalized === 'danger') return 'danger';
    return 'default';
  };

  const actualType = normalizeType(type);
  const isDisabled = actualType === 'disabled';
  const Component = isDisabled ? 'div' : 'button';

  const containerClassNames = [
    styles.itemRow,
    styles[`type_${actualType}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Component
      className={containerClassNames}
      onClick={onClick}
      disabled={isDisabled}
      type={Component === 'button' ? 'button' : undefined}
      {...props}
    >
      {showInfo && (
        <div className={styles.infoIcon}>
          <img 
            src="/icons/Icon.svg" 
            alt="Info" 
            className={styles.infoIconImg}
          />
        </div>
      )}
      <div className={styles.content}>
        {showLeftIcon && (
          <div className={styles.iconWrapper}>
            {chooseLeftIcon || (
              <div className={styles.fileIcon}>
                <img 
                  src="/icons/File.svg" 
                  alt="File" 
                  className={styles.fileIconImg}
                />
              </div>
            )}
          </div>
        )}
        <div className={styles.text}>
          <p className={styles.label}>{label}</p>
          {showBody && (
            <p className={styles.body}>{body}</p>
          )}
        </div>
        {showRightIcon && (
          <div className={styles.iconWrapper}>
            {chooseRightIcon || (
              <div className={styles.starIcon}>
                <img 
                  src="/icons/Star.svg" 
                  alt="Star" 
                  className={styles.starIconImg}
                />
              </div>
            )}
          </div>
        )}
      </div>
      {hasCheckbox && (
        <div className={styles.checkboxField}>
          <div className={styles.checkboxFieldInner}>
            <div className={styles.checkboxWrapper}>
              {checked || actualType === 'selected' ? (
                <div className={`${styles.checkbox} ${styles.checkboxChecked}`}>
                  <div className={styles.checkboxCheck}>
                    <div className={styles.checkIconWrapper}>
                      <div className={styles.checkIconInner}>
                        <img 
                          src="/icons/check.svg" 
                          alt="Check" 
                          className={styles.checkIcon}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className={styles.checkbox}></div>
              )}
            </div>
          </div>
        </div>
      )}
      {hasRadio && (
        <div className={styles.radioField}>
          <div className={styles.radioWrapper}>
            <div className={styles.radio}></div>
          </div>
        </div>
      )}
    </Component>
  );
};

export default ItemRow;

