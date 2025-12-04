import React from 'react';
import Button from '../ui/Button/Button';
import InfoCard from '../InfoCard/InfoCard';
import DataTable from '../DataTable/DataTable';
import styles from './ListDetailsPanel.module.css';

const ListDetailsPanel = ({
  list = null,
  onUseInPolicyClick,
  onMenuClick,
  className = '',
  ...props
}) => {
  const defaultList = list || {
    id: '1',
    name: 'BlackList-Generative AI',
    createdBy: { email: 'emma@sqrx.com', date: '1st June, 2025 at 12:32 PM' },
    updatedBy: { email: 'anant@sqrx.com', date: '1st June, 2025 at 12:32 PM' },
    regexSupport: false,
    items: [
      { id: 1, number: 1, name: 'chatgpt.com' },
      { id: 2, number: 2, name: 'claude.ai' },
      { id: 3, number: 3, name: 'gemini.google.com' },
      { id: 4, number: 4, name: 'perplexity.ai' },
      { id: 5, number: 5, name: 'meta.ai' },
      { id: 6, number: 6, name: 'elevenlabs.io' },
    ],
  };

  const containerClassNames = [
    styles.listDetailsPanel,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClassNames} {...props}>
      <div className={styles.content}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>{defaultList.name}</h2>
          <div className={styles.actions}>
            <div className={styles.useInPolicyButton}>
              <Button
                label="Use in Policy"
                style="neutral"
                size="small"
                onClick={onUseInPolicyClick}
              />
            </div>
            <button
              className={styles.menuButton}
              onClick={onMenuClick}
              type="button"
            >
              <div className={styles.menuIcon}>
                <img
                  src="/icons/Icon.svg"
                  alt="More"
                  className={styles.menuIconImg}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Info Cards */}
        <div className={styles.infoCards}>
          <InfoCard
            title="Created by"
            body={defaultList.createdBy.email}
            date={defaultList.createdBy.date}
            showIcon={false}
            showDateAndTime={true}
            state="default"
          />
          <div className={styles.divider}></div>
          <InfoCard
            title="Updated by"
            body={defaultList.updatedBy.email}
            date={defaultList.updatedBy.date}
            showIcon={false}
            showDateAndTime={true}
            state="default"
          />
          <div className={styles.divider}></div>
          <InfoCard
            title="Regex Support"
            body="Disabled"
            showIcon={true}
            showDateAndTime={false}
            state="danger"
          />
        </div>

        {/* URL List Items Section */}
        <div className={styles.urlListSection}>
          <h3 className={styles.sectionTitle}>URL List Items</h3>
          <DataTable
            columns={[
              { id: 'number', label: '#', width: '48px' },
              { id: 'name', label: 'Item Name', width: 'auto' },
            ]}
            data={defaultList.items}
          />
        </div>
      </div>
    </div>
  );
};

export default ListDetailsPanel;

