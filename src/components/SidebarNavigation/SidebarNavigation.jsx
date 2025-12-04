import React, { useState } from 'react';
import Search from '../ui/Search/Search';
import styles from './SidebarNavigation.module.css';

const SidebarNavigation = ({
  navigationSections = [],
  onSectionClick,
  onItemClick,
  className = '',
  ...props
}) => {
  const [expandedSections, setExpandedSections] = useState(
    navigationSections.reduce((acc, section) => {
      if (section.expanded) {
        acc[section.id] = true;
      }
      return acc;
    }, {})
  );

  const handleSectionToggle = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const defaultSections = navigationSections.length > 0
    ? navigationSections
    : [
        {
          id: 'monitor',
          label: 'Monitor',
          icon: '/icons/Icon (from Tabler.io).svg',
          expanded: false,
          items: [],
        },
        {
          id: 'manage',
          label: 'Manage',
          icon: '/icons/Frame.svg',
          expanded: true,
          items: [
            { id: 'policies', label: 'Policies', icon: '/icons/Frame1.svg' },
            { id: 'lists', label: 'Lists', icon: '/icons/Frame2.svg', active: true },
            { id: 'users', label: 'Users', icon: '/icons/Frame3.svg' },
            { id: 'exception-requests', label: 'Exception Requests', icon: '/icons/Frame4.svg' },
            { id: 'integrations', label: 'Integrations', icon: '/icons/Frame5.svg' },
          ],
        },
        {
          id: 'configure',
          label: 'Configure',
          icon: '/icons/Frame6.svg',
          expanded: false,
          items: [],
        },
      ];

  const containerClassNames = [
    styles.sidebarNavigation,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClassNames} {...props}>
      <div className={styles.topSection}>
        {/* Logo Container */}
        <div className={styles.logoContainer}>
          <div className={styles.logo}>
            <div className={styles.iconContainer}>
              <img
                src="/icons/logo sqrx.svg"
                alt="SquareX Logo"
                className={styles.logoIcon}
              />
            </div>
            <div className={styles.logoText}>
              <p className={styles.logoTextContent}>SquareX</p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className={styles.searchContainer}>
          <Search placeholder="Search" state="default" />
        </div>

        {/* Navigation Sections */}
        <div className={styles.navSections}>
          {defaultSections.map((section) => {
            const isExpanded = expandedSections[section.id] ?? section.expanded ?? false;
            const hasItems = section.items && section.items.length > 0;

            return (
              <div key={section.id} className={styles.navSection}>
                <button
                  className={styles.navSectionTitle}
                  onClick={() => handleSectionToggle(section.id)}
                  type="button"
                >
                  <div className={styles.sectionIcon}>
                    <img src={section.icon} alt="" className={styles.sectionIconImg} />
                  </div>
                  <p
                    className={`${styles.sectionLabel} ${
                      section.id === 'manage' && isExpanded ? styles.sectionLabelActive : ''
                    }`}
                  >
                    {section.label}
                  </p>
                  {hasItems && (
                    <div className={styles.chevronContainer}>
                      <div
                        className={styles.chevronIcon}
                        style={{
                          transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.2s ease',
                        }}
                      >
                        <img
                          src="/icons/chevron.svg"
                          alt="Chevron"
                          className={styles.chevronImg}
                        />
                      </div>
                    </div>
                  )}
                </button>

                {isExpanded && hasItems && (
                  <div className={styles.navItems}>
                    {section.items.map((item) => (
                      <button
                        key={item.id}
                        className={`${styles.navItem} ${
                          item.active ? styles.navItemActive : ''
                        }`}
                        onClick={() => {
                          if (onItemClick) onItemClick(item);
                        }}
                        type="button"
                      >
                        <div className={styles.navItemIcon}>
                          <img src={item.icon} alt="" className={styles.navItemIconImg} />
                        </div>
                        <p className={styles.navItemLabel}>{item.label}</p>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className={styles.buttonsGroup}>
        <div className={styles.avatarContainer}>
          <div className={styles.avatar}>
            <img
              src="/icons/manager.svg"
              alt="Avatar"
              className={styles.avatarImg}
            />
          </div>
        </div>
        <button className={styles.actionButton} type="button">
          <div className={styles.actionIcon}>
            <img
              src="/icons/Icon (from Tabler.io).svg"
              alt="Icon"
              className={styles.actionIconImg}
            />
          </div>
        </button>
        <button className={styles.actionButton} type="button">
          <div className={styles.actionIcon}>
            <img src="/icons/Frame7.svg" alt="Icon" className={styles.actionIconImg} />
          </div>
          <div className={styles.badge}>
            <p className={styles.badgeText}>9</p>
          </div>
        </button>
        <button className={styles.actionButton} type="button">
          <div className={styles.actionIcon}>
            <img
              src="/icons/Icon (from Tabler.io).svg"
              alt="Help"
              className={styles.actionIconImg}
            />
          </div>
        </button>
      </div>
    </div>
  );
};

export default SidebarNavigation;

