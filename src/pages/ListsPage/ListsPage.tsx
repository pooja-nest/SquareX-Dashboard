import React, { useState } from 'react';
import './ListsPage.css';
import Button from '../../components/ui/Button/Button';
import Search from '../../components/ui/Search/Search';
import Dropdown from '../../components/ui/Dropdown/Dropdown';
import ItemRow from '../../components/ui/ItemRow/ItemRow';
import IconButton from '../../components/ui/IconButton/IconButton';
import Badge from '../../components/ui/Badge/Badge';

const ListsPage: React.FC = () => {
  const [selectedList, setSelectedList] = useState('blacklist-generative-ai');
  const [activeTab, setActiveTab] = useState('lists');
  const [expandedSections, setExpandedSections] = useState({
    monitor: false,
    manage: true,
    configure: false,
  });

  const toggleSection = (section: 'monitor' | 'manage' | 'configure') => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const listItems = [
    { id: 'blacklist-generative-ai', label: 'BlackList-Generative AI', bodyText: 'URLs' },
    { id: 'invoice', label: 'Invoice', bodyText: 'File Name' },
    { id: 'admin-files', label: 'Admin Files', bodyText: 'File Extension' },
    { id: 'blocked-hash-lists', label: 'Blocked Hash Lists', bodyText: 'File Hash' },
    { id: 'blocked-extensions', label: 'Blocked Extensions', bodyText: 'Extension' },
    { id: 'malicious-access-list', label: 'Malicious Access List', bodyText: 'Web Access' },
    { id: 'windows-apps', label: 'Windows Apps', bodyText: 'Private App' },
    { id: 'blocked-extensions-2', label: 'Blocked Extensions 2', bodyText: 'Extension' },
    { id: 'admin-lists', label: 'Admin Lists', bodyText: 'Security' },
  ];

  const urlItems = [
    { id: 1, name: 'chatgpt.com' },
    { id: 2, name: 'claude.ai' },
    { id: 3, name: 'gemini.google.com' },
    { id: 4, name: 'perplexity.ai' },
    { id: 5, name: 'meta.ai' },
    { id: 6, name: 'elevenlabs.io' },
  ];

  const dropdownOptions = [
    { value: 'all-lists', label: 'All Lists' },
    { value: 'categories', label: 'Categories' },
    { value: 'dlp-categories', label: 'DLP Categories' },
  ];

  const ChevronDownIcon = ({ className = '' }: { className?: string }) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className={className}>
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const SearchIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M7 12C9.76142 12 12 9.76142 12 7C12 4.23858 9.76142 2 7 2C4.23858 2 2 4.23858 2 7C2 9.76142 4.23858 12 7 12Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 14L10.5 10.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const PlusIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M8 3V13M3 8H13"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const MoreVerticalIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const InfoIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M8 12V8M8 4H8.01M15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const DocumentationIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M6 2H3C2.44772 2 2 2.44772 2 3V13C2 13.5523 2.44772 14 3 14H13C13.5523 14 14 13.5523 14 13V6M6 2L14 10M6 2V6H10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const BellIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M10 2C7.23858 2 5 4.23858 5 7V10.5858L3.29289 12.2929C3.10536 12.4804 3 12.7348 3 13V14C3 14.5523 3.44772 15 4 15H16C16.5523 15 17 14.5523 17 14V13C17 12.7348 16.8946 12.4804 16.7071 12.2929L15 10.5858V7C15 4.23858 12.7614 2 10 2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 15V16C7 17.6569 8.34315 19 10 19C11.6569 19 13 17.6569 13 16V15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const StarIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const HelpIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 14V14.01M10 6C8.34315 6 7 7.34315 7 9C7 9.55228 7.44772 10 8 10H9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <div className="lists-page">
      {/* Background */}
      <div className="lists-page-background" />

      {/* Left Sidebar */}
      <aside className="lists-page-sidebar">
        <div className="lists-page-sidebar-content">
          {/* Logo */}
          <div className="lists-page-logo">
            <div className="lists-page-logo-icon">
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                <path
                  d="M15 3L20 10H25L20 17L15 24L10 17L5 10H10L15 3Z"
                  fill="#4432BF"
                />
              </svg>
            </div>
            <span className="lists-page-logo-text">SquareX</span>
          </div>

          {/* Search */}
          <div className="lists-page-sidebar-search">
            <Search placeholder="Search" />
          </div>

          {/* Navigation Sections */}
          <nav className="lists-page-nav">
            {/* Monitor Section */}
            <div className="lists-page-nav-section">
              <button
                className="lists-page-nav-section-title"
                onClick={() => toggleSection('monitor')}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M10 2L2 7L10 12L18 7L10 2Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 17L10 12L18 17"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 12L10 7L18 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Monitor</span>
                <ChevronDownIcon className={expandedSections.monitor ? 'rotated' : ''} />
              </button>
            </div>

            {/* Manage Section */}
            <div className="lists-page-nav-section">
              <button
                className="lists-page-nav-section-title active"
                onClick={() => toggleSection('manage')}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M10 2L2 7L10 12L18 7L10 2Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 17L10 12L18 17"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 12L10 7L18 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Manage</span>
                <ChevronDownIcon className={expandedSections.manage ? 'rotated' : ''} />
              </button>
              {expandedSections.manage && (
                <div className="lists-page-nav-items">
                  <div className="lists-page-nav-item">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M2 4H18M2 8H18M2 12H18M2 16H18"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span>Policies</span>
                  </div>
                  <div className="lists-page-nav-item active">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M2 4H18M2 8H18M2 12H18M2 16H18"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span>Lists</span>
                  </div>
                  <div className="lists-page-nav-item">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M10 10C12.7614 10 15 7.76142 15 5C15 2.23858 12.7614 0 10 0C7.23858 0 5 2.23858 5 5C5 7.76142 7.23858 10 10 10Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M0 20C0 15.5817 4.47715 12 10 12C15.5228 12 20 15.5817 20 20"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>Users</span>
                  </div>
                  <div className="lists-page-nav-item">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M10 2L2 7L10 12L18 7L10 2Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2 17L10 12L18 17"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>Exception Requests</span>
                  </div>
                  <div className="lists-page-nav-item">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M10 2L2 7L10 12L18 7L10 2Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>Integrations</span>
                  </div>
                </div>
              )}
            </div>

            {/* Configure Section */}
            <div className="lists-page-nav-section">
              <button
                className="lists-page-nav-section-title"
                onClick={() => toggleSection('configure')}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M10 12C11.1046 12 12 11.1046 12 10C12 8.89543 11.1046 8 10 8C8.89543 8 8 8.89543 8 10C8 11.1046 8.89543 12 10 12Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15.6569 4.34315L17.0711 2.92893C17.4616 2.53841 17.4616 1.90524 17.0711 1.51472C16.6805 1.12419 16.0474 1.12419 15.6569 1.51472L14.2426 3.12893C13.0237 2.38605 11.5722 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10C18 8.42779 17.6139 6.97631 16.8711 5.75736L15.6569 4.34315Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Configure</span>
                <ChevronDownIcon className={expandedSections.configure ? 'rotated' : ''} />
              </button>
            </div>
          </nav>

          {/* Bottom Actions */}
          <div className="lists-page-sidebar-actions">
            <div className="lists-page-user-avatar">
              <div className="lists-page-avatar-circle" />
            </div>
            <IconButton
              variant="subtle"
              size="medium"
              icon={<BellIcon />}
              aria-label="Notifications"
            />
            <div className="lists-page-icon-button-with-badge">
              <IconButton
                variant="subtle"
                size="medium"
                icon={<StarIcon />}
                aria-label="Favorites"
              />
              <Badge label="9" variant="default" className="lists-page-notification-badge" />
            </div>
            <IconButton
              variant="subtle"
              size="medium"
              icon={<HelpIcon />}
              aria-label="Help"
            />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lists-page-main">
        {/* Header Section */}
        <div className="lists-page-header">
          <div className="lists-page-header-top">
            <h1 className="lists-page-title">Lists</h1>
            <Button variant="subtle" size="medium" leadingIcon={<DocumentationIcon />}>
              Documentation
            </Button>
          </div>

          {/* Tabs */}
          <div className="lists-page-tabs">
            <button
              className={`lists-page-tab ${activeTab === 'lists' ? 'active' : ''}`}
              onClick={() => setActiveTab('lists')}
            >
              20 Lists
            </button>
            <button
              className={`lists-page-tab ${activeTab === 'categories' ? 'active' : ''}`}
              onClick={() => setActiveTab('categories')}
            >
              5 Categories
            </button>
            <button
              className={`lists-page-tab ${activeTab === 'dlp' ? 'active' : ''}`}
              onClick={() => setActiveTab('dlp')}
            >
              19 DLP Categories
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="lists-page-content">
          {/* Middle Panel */}
          <div className="lists-page-middle-panel">
            <Button variant="primary" size="medium" leadingIcon={<PlusIcon />} className="lists-page-create-button">
              Create new list
            </Button>
            <div className="lists-page-middle-search">
              <Search placeholder="Search" />
            </div>
            <div className="lists-page-middle-dropdown">
              <Dropdown
                options={dropdownOptions}
                value="all-lists"
                variant="medium"
                state="selected"
                className="lists-page-dropdown-no-label"
              />
            </div>
            <div className="lists-page-list-items">
              {listItems.map((item) => (
                <div key={item.id}>
                  <ItemRow
                    label={item.label}
                    bodyText={item.bodyText}
                    state={selectedList === item.id ? 'selected' : 'default'}
                    onClick={() => setSelectedList(item.id)}
                    className="lists-page-list-item"
                  />
                  {item.id !== listItems[listItems.length - 1].id && (
                    <div className="lists-page-list-divider" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel - Details */}
          <div className="lists-page-details-panel">
            <div className="lists-page-details-content">
              {/* Title Section */}
              <div className="lists-page-details-header">
                <h2 className="lists-page-details-title">BlackList-Generative AI</h2>
                <div className="lists-page-details-actions">
                  <Button variant="subtle" size="small">
                    Use in Policy
                  </Button>
                  <IconButton
                    variant="subtle"
                    size="medium"
                    icon={<MoreVerticalIcon />}
                    aria-label="More options"
                  />
                </div>
              </div>

              {/* Info Cards */}
              <div className="lists-page-info-cards">
                <div className="lists-page-info-card">
                  <div className="lists-page-info-card-content">
                    <p className="lists-page-info-label">Created by</p>
                    <p className="lists-page-info-value">emma@sqrx.com</p>
                    <p className="lists-page-info-date">1st June, 2025 at 12:32 PM</p>
                  </div>
                </div>
                <div className="lists-page-info-card-divider" />
                <div className="lists-page-info-card">
                  <div className="lists-page-info-card-content">
                    <p className="lists-page-info-label">Updated by</p>
                    <p className="lists-page-info-value">anant@sqrx.com</p>
                    <p className="lists-page-info-date">1st June, 2025 at 12:32 PM</p>
                  </div>
                </div>
                <div className="lists-page-info-card-divider" />
                <div className="lists-page-info-card">
                  <div className="lists-page-info-card-content">
                    <div className="lists-page-info-label-row">
                      <p className="lists-page-info-label">Regex Support</p>
                      <InfoIcon />
                    </div>
                    <p className="lists-page-info-value-danger">Disabled</p>
                  </div>
                </div>
              </div>

              {/* URL List Items Section */}
              <div className="lists-page-table-section">
                <h3 className="lists-page-table-title">URL List Items</h3>
                <div className="lists-page-table">
                  <div className="lists-page-table-header">
                    <div className="lists-page-table-header-cell lists-page-table-cell-number">
                      <span>#</span>
                    </div>
                    <div className="lists-page-table-header-cell lists-page-table-cell-name">
                      <span>Item Name</span>
                    </div>
                  </div>
                  <div className="lists-page-table-body">
                    {urlItems.map((item) => (
                      <div key={item.id} className="lists-page-table-row">
                        <div className="lists-page-table-cell lists-page-table-cell-number">
                          <span>{item.id}</span>
                        </div>
                        <div className="lists-page-table-cell lists-page-table-cell-name">
                          <span>{item.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ListsPage;
