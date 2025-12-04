import React from 'react';
import styles from './DataTable.module.css';

const DataTable = ({
  columns = [],
  data = [],
  className = '',
  ...props
}) => {
  const defaultColumns = columns.length > 0
    ? columns
    : [
        { id: 'number', label: '#', width: '48px' },
        { id: 'name', label: 'Item Name', width: 'auto' },
      ];

  const defaultData = data.length > 0
    ? data
    : [
        { id: 1, number: 1, name: 'chatgpt.com' },
        { id: 2, number: 2, name: 'claude.ai' },
        { id: 3, number: 3, name: 'gemini.google.com' },
        { id: 4, number: 4, name: 'perplexity.ai' },
        { id: 5, number: 5, name: 'meta.ai' },
        { id: 6, number: 6, name: 'elevenlabs.io' },
      ];

  const containerClassNames = [
    styles.dataTable,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClassNames} {...props}>
      <div className={styles.table}>
        {/* Header */}
        <div className={styles.header}>
          {defaultColumns.map((column) => (
            <div
              key={column.id}
              className={styles.cellHeader}
              style={{ maxWidth: column.width === 'auto' ? 'none' : column.width }}
            >
              <div className={styles.cellContent}>
                <p className={styles.headerText}>{column.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Content - Render rows, not columns */}
        <div className={styles.content}>
          {defaultData.map((row) => (
            <div key={row.id} className={styles.row}>
              {defaultColumns.map((column) => (
                <div
                  key={column.id}
                  className={styles.cell}
                  style={{ maxWidth: column.width === 'auto' ? 'none' : column.width }}
                >
                  <div className={styles.cellContent}>
                    <p className={styles.cellText}>
                      {row[column.id] || (column.id === 'number' ? row.number : row.name)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DataTable;

