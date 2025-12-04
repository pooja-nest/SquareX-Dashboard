import React from 'react';
import Button from '../ui/Button/Button';
import styles from './PageHeader.module.css';

const PageHeader = ({
  title = 'Lists',
  activeTab = 'lists',
  tabs = [
    { id: 'lists', label: '20 Lists' },
    { id: 'categories', label: '5 Categories' },
    { id: 'dlpCategories', label: '19 DLP Categories' },
  ],
  onTabClick,
  onDocumentationClick,
  className = '',
  ...props
}) => {
  const containerClassNames = [
    styles.pageHeader,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClassNames} {...props}>
      <div className={styles.titleAndCta}>
        <h1 className={styles.pageTitle}>{title}</h1>
        <div className={styles.documentationButton}>
          <div className={styles.docIcon}>
            <img src="/icons/Book open.svg" alt="Documentation" className={styles.docIconImg} />
          </div>
          <p className={styles.docText}>Documentation</p>
        </div>
      </div>
      <div className={styles.tabList}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
            onClick={() => {
              if (onTabClick) onTabClick(tab.id);
            }}
            type="button"
          >
            <p className={activeTab === tab.id ? styles.tabTextActive : styles.tabText}>
              {tab.label}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PageHeader;

