import React, { useState } from 'react';
import Button from '../ui/Button/Button';
import Search from '../ui/Search/Search';
import Dropdown from '../ui/Dropdown/Dropdown';
import DropdownMaster from '../ui/DropdownMaster/DropdownMaster';
import ItemRow from '../ui/ItemRow/ItemRow';
import styles from './ListsPanel.module.css';

const ListsPanel = ({
  lists = [],
  selectedListId,
  onListClick,
  onCreateClick,
  onDropdownItemClick,
  className = '',
  ...props
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const defaultLists = lists.length > 0
    ? lists
    : [
        { id: '1', name: 'BlackList-Generative AI', type: 'URLs', selected: true },
        { id: '2', name: 'Invoice', type: 'File Name', selected: false },
        { id: '3', name: 'Admin Files', type: 'File Extension', selected: false },
        { id: '4', name: 'Blocked Hash Lists', type: 'File Hash', selected: false },
        { id: '5', name: 'Blocked Extensions', type: 'Extension', selected: false },
        { id: '6', name: 'Malicious Access List', type: 'Web Access', selected: false },
        { id: '7', name: 'Windows Apps', type: 'Private App', selected: false },
        { id: '8', name: 'Blocked Extensions 2', type: 'Extension', selected: false },
        { id: '9', name: 'Admin Lists', type: 'Security', selected: false },
      ];

  const dropdownCategories = [
    {
      id: 'all-lists',
      label: 'All lists',
      expandable: false,
      items: [],
    },
    {
      id: 'default-category',
      label: 'Default Category',
      expandable: true,
      expanded: true,
      items: [
        { id: 'url', label: 'URL', icon: '/icons/File.svg' },
        { id: 'filename', label: 'File Name', icon: '/icons/File.svg' },
        { id: 'fileextension', label: 'File Extension', icon: '/icons/File.svg' },
        { id: 'filehash', label: 'File Hash', icon: '/icons/File.svg' },
        { id: 'extension', label: 'Extension', icon: '/icons/File.svg' },
      ],
    },
    {
      id: 'your-category',
      label: 'Your Category',
      expandable: true,
      expanded: true,
      items: [
        { id: 'advertising', label: 'Advertising', icon: '/icons/Icon.svg' },
        { id: 'entertainment', label: 'Entertainment', icon: '/icons/Icon.svg' },
        { id: 'invoice', label: 'Invoice', icon: '/icons/Icon.svg' },
        { id: 'music', label: 'Music', icon: '/icons/Icon.svg' },
        { id: 'marketing', label: 'Marketing Team', icon: '/icons/Icon.svg' },
      ],
    },
  ];

  const containerClassNames = [
    styles.listsPanel,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClassNames} {...props}>
      {/* Create Button */}
      <Button
        label="Create new list"
        style="primary"
        size="medium"
        showLeadingIcon={true}
        leadingIcon={<img src="/icons/Icon.svg" alt="Add" className={styles.createIcon} />}
        onClick={onCreateClick}
        className={styles.createButton}
      />

      {/* Search */}
      <div className={styles.searchContainer}>
        <Search placeholder="Search" state="default" hasError={false} />
      </div>

      {/* Dropdown */}
      <div className={styles.dropdownContainer}>
        <div className={styles.dropdownWrapper}>
          <Dropdown
            value="All Lists"
            state="selected"
            hasLabel={false}
            hasDescription={false}
            type="medium"
            onClick={() => setShowDropdown(!showDropdown)}
            className={styles.dropdown}
          />
          {showDropdown && (
            <div className={styles.dropdownMasterContainer}>
              <DropdownMaster
                categories={dropdownCategories}
                onItemClick={(item) => {
                  if (onDropdownItemClick) onDropdownItemClick(item);
                  setShowDropdown(false);
                }}
              />
            </div>
          )}
        </div>

        {/* Lists */}
        <div className={styles.listsContainer}>
          {defaultLists.map((list, index) => (
            <React.Fragment key={list.id}>
              <button
                className={`${styles.listItem} ${
                  (selectedListId === list.id || list.selected) ? styles.listItemSelected : ''
                }`}
                onClick={() => {
                  if (onListClick) onListClick(list);
                }}
                type="button"
              >
                <div className={styles.listItemText}>
                  <p className={styles.listItemTitle}>{list.name}</p>
                  <p className={styles.listItemSubtitle}>{list.type}</p>
                </div>
              </button>
              {index < defaultLists.length - 1 && (
                <div className={styles.divider}></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListsPanel;

