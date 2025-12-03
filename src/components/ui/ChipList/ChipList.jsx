import React from 'react';
import styles from './ChipList.module.css';
import Chip from '../Chip/Chip';

const ChipList = ({
  chips = [],
  layout = 'single',
  onChipRemove,
  className = '',
  ...props
}) => {
  // Default chips if none provided
  const defaultChips = [
    { label: 'Label', id: '1' },
    { label: 'Label', id: '2' },
    { label: 'Label', id: '3' },
  ];

  const displayChips = chips.length > 0 ? chips : defaultChips;
  const normalizedLayout = layout.toLowerCase();

  // Split chips into rows for double layout
  const getRows = () => {
    if (normalizedLayout === 'double' || normalizedLayout === 'doublerow') {
      const midPoint = Math.ceil(displayChips.length / 2);
      return [
        displayChips.slice(0, midPoint),
        displayChips.slice(midPoint),
      ];
    }
    return [displayChips];
  };

  const rows = getRows();

  const containerClassNames = [
    styles.container,
    styles[`layout_${normalizedLayout}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClassNames} {...props}>
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className={styles.row}>
          {row.map((chip) => (
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
      ))}
    </div>
  );
};

export default ChipList;

