import React from 'react';
import './NestedSection.css';

export interface DropdownItem {
  id: string;
  label: string;
  value?: string;
}

export interface NestedSectionProps {
  label?: string;
  dropdowns?: DropdownItem[][];
  onDragStart?: () => void;
  onDragEnd?: () => void;
  onMoreClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

const NestedSection: React.FC<NestedSectionProps> = ({
  label,
  dropdowns = [],
  onDragStart,
  onDragEnd,
  onMoreClick,
  className = '',
  children,
}) => {
  return (
    <div className={`nested-section-wrapper ${className}`}>
      <div className="nested-section-container">
        <div
          className="nested-section-drag-handle"
          draggable={!!onDragStart}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          role="button"
          aria-label="Drag to reorder"
          tabIndex={0}
        >
          <svg width="10" height="15" viewBox="0 0 10 15" fill="none">
            <circle cx="2" cy="2.5" r="1" fill="#2f353b" opacity="0.5" />
            <circle cx="2" cy="7.5" r="1" fill="#2f353b" opacity="0.5" />
            <circle cx="2" cy="12.5" r="1" fill="#2f353b" opacity="0.5" />
            <circle cx="5" cy="2.5" r="1" fill="#2f353b" opacity="0.5" />
            <circle cx="5" cy="7.5" r="1" fill="#2f353b" opacity="0.5" />
            <circle cx="5" cy="12.5" r="1" fill="#2f353b" opacity="0.5" />
            <circle cx="8" cy="2.5" r="1" fill="#2f353b" opacity="0.5" />
            <circle cx="8" cy="7.5" r="1" fill="#2f353b" opacity="0.5" />
            <circle cx="8" cy="12.5" r="1" fill="#2f353b" opacity="0.5" />
          </svg>
        </div>
        <div className="nested-section-content">
          {label && (
            <div className="nested-section-label">{label}</div>
          )}
          {dropdowns.length > 0 && (
            <div className="nested-section-dropdowns">
              {dropdowns.map((dropdownGroup: DropdownItem[], groupIndex) => (
                <div key={groupIndex} className="nested-section-dropdown-group">
                  {dropdownGroup.map((item: DropdownItem) => (
                    <div key={item.id} className="nested-section-dropdown">
                      <span className="nested-section-dropdown-value">
                        {item.value || item.label}
                      </span>
                      <span className="nested-section-dropdown-chevron" aria-hidden="true">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path
                            d="M4 6L8 10L12 6"
                            stroke="#2f353b"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
          {children}
        </div>
        {onMoreClick && (
          <button
            type="button"
            className="nested-section-more"
            onClick={onMoreClick}
            aria-label="More options"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="6" r="1.5" fill="#323232" />
              <circle cx="12" cy="12" r="1.5" fill="#323232" />
              <circle cx="12" cy="18" r="1.5" fill="#323232" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default NestedSection;

