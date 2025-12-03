import React from 'react';
import styles from './Badge.module.css';

const Badge = ({
  label = 'Badge',
  size = 'medium',
  type = 'active',
  className = '',
  ...props
}) => {
  // Normalize type
  const normalizeType = (typeName) => {
    if (!typeName) return 'active';
    const normalized = typeName.toLowerCase();
    if (normalized === 'inactive') return 'inactive';
    if (normalized === 'default') return 'default';
    return 'active';
  };

  const actualType = normalizeType(type);
  const normalizedSize = size.toLowerCase();

  const containerClassNames = [
    styles.badge,
    styles[`size_${normalizedSize}`],
    styles[`type_${actualType}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClassNames} {...props}>
      <span className={styles.label}>{label}</span>
    </div>
  );
};

export default Badge;

