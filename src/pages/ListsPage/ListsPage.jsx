import React, { useState } from 'react';
import SidebarNavigation from '../../components/SidebarNavigation/SidebarNavigation';
import PageHeader from '../../components/PageHeader/PageHeader';
import ListsPanel from '../../components/ListsPanel/ListsPanel';
import ListDetailsPanel from '../../components/ListDetailsPanel/ListDetailsPanel';
import styles from './ListsPage.module.css';

const ListsPage = () => {
  const [activeTab, setActiveTab] = useState('lists');
  const [selectedListId, setSelectedListId] = useState('1');

  const lists = [
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

  const selectedList = lists.find((list) => list.id === selectedListId) || lists[0];

  const listDetails = {
    id: selectedList.id,
    name: selectedList.name,
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

  return (
    <div className={styles.listsPage}>
      {/* Background Effects */}
      <div className={styles.background}>
        <div className={styles.base}></div>
        <div className={styles.gradientBlobs}>
          <div className={styles.blob1}></div>
          <div className={styles.blob2}></div>
          <div className={styles.blob3}></div>
        </div>
        <div className={styles.middleLayer}></div>
        <div className={styles.noiseTexture}></div>
      </div>

      {/* Sidebar Navigation */}
      <SidebarNavigation />

      {/* Main Content */}
      <div className={styles.mainContent}>
        <div className={styles.mainContentInner}>
          {/* Page Header */}
          <PageHeader
            title="Lists"
            activeTab={activeTab}
            tabs={[
              { id: 'lists', label: '20 Lists' },
              { id: 'categories', label: '5 Categories' },
              { id: 'dlpCategories', label: '19 DLP Categories' },
            ]}
            onTabClick={setActiveTab}
          />

          {/* Two Panel Layout */}
          <div className={styles.panelsContainer}>
            {/* Lists Panel (Left) */}
            <ListsPanel
              lists={lists}
              selectedListId={selectedListId}
              onListClick={(list) => setSelectedListId(list.id)}
            />

            {/* List Details Panel (Right) */}
            <ListDetailsPanel list={listDetails} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListsPage;

