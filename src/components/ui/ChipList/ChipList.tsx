import React from 'react';
import './ChipList.css';

export interface Chip {
  id: string;
  label: string;
  onRemove?: () => void;
}

export type ChipListVariant = 'singleRow' | 'doubleRow';

export interface ChipListProps {
  chips: Chip[];
  variant?: ChipListVariant;
  onChipRemove?: (chipId: string) => void;
  className?: string;
  'aria-label'?: string;
}

const ChipList: React.FC<ChipListProps> = ({
  chips,
  variant = 'singleRow',
  onChipRemove,
  className = '',
  'aria-label': ariaLabel,
  ...props
}) => {
  const handleChipRemove = (chipId: string) => {
    const chip = chips.find((c) => c.id === chipId);
    if (chip?.onRemove) {
      chip.onRemove();
    }
    if (onChipRemove) {
      onChipRemove(chipId);
    }
  };

  return (
    <div
      className={`chip-list chip-list-${variant} ${className}`}
      aria-label={ariaLabel || 'Chip list'}
      {...props}
    >
      {chips.map((chip: Chip) => (
        <div key={chip.id} className="chip-list-chip">
          <span className="chip-list-chip-label">{chip.label}</span>
          {chip.onRemove || onChipRemove ? (
            <button
              type="button"
              className="chip-list-chip-remove"
              onClick={() => handleChipRemove(chip.id)}
              aria-label={`Remove ${chip.label}`}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5"
                  stroke="#323232"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default ChipList;

