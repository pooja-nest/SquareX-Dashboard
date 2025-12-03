import React, { useState } from 'react';
import IconButton from './ui/IconButton/IconButton';
import Button from './ui/Button/Button';
import ButtonDanger from './ui/ButtonDanger/ButtonDanger';
import InputField from './ui/InputField/InputField';
import TextArea from './ui/TextArea/TextArea';
import Dropdown from './ui/Dropdown/Dropdown';
import Search from './ui/Search/Search';
import ListSearch from './ui/ListSearch/ListSearch';
import NestedSection from './ui/NestedSection/NestedSection';
import Chip from './ui/Chip/Chip';
import ChipList from './ui/ChipList/ChipList';
import StatusIndicator from './ui/StatusIndicator/StatusIndicator';
import Badge from './ui/Badge/Badge';
import ItemRow from './ui/ItemRow/ItemRow';
import ListOfItems from './ui/ListOfItems/ListOfItems';
import DropdownNestedColumn from './ui/DropdownNestedColumn/DropdownNestedColumn';
import DropdownNested from './ui/DropdownNested/DropdownNested';
import './ComponentLibrary.css';

const ComponentLibrary = () => {
  const [activeTab, setActiveTab] = useState('iconbutton');
  const styles = ['primary', 'secondary', 'neutral', 'subtle'];
  const dangerStyles = ['primary', 'neutral', 'subtle'];
  const states = ['default', 'hover', 'focus', 'disabled', 'loading'];
  const sizes = ['medium', 'small'];

  const tabs = [
    { id: 'iconbutton', label: 'IconButton' },
    { id: 'button', label: 'Button' },
    { id: 'buttondanger', label: 'ButtonDanger' },
    { id: 'inputfield', label: 'InputField' },
    { id: 'nestedsection', label: 'NestedSection' },
    { id: 'itemrow', label: 'ItemRow' },
  ];

  const renderIconButtonComponent = () => (
    <div className="component-section">
      <h2 className="component-section-title">IconButton Component</h2>
      <div className="component-grid-container">
        <div className="component-grid">
          {/* Header row with state labels */}
          <div className="component-grid-header">
            <div className="component-grid-header-cell"></div>
            {states.map((state) => (
              <div key={state} className="component-grid-header-cell">
                {state.charAt(0).toUpperCase() + state.slice(1)}
              </div>
            ))}
          </div>
          
          {/* Rows for each style */}
          {styles.map((style) => (
            <div key={style} className="component-grid-row">
              <div className="component-grid-row-label">
                {style.charAt(0).toUpperCase() + style.slice(1)}
              </div>
              {states.map((state) => (
                <div key={state} className="component-grid-cell">
                  <div className="component-grid-cell-content">
                    {sizes.map((size) => (
                      <div key={size} className="component-grid-item">
                        <div className="component-label">
                          {size.charAt(0).toUpperCase() + size.slice(1)}
                        </div>
                        <IconButton
                          style={style}
                          state={state}
                          size={size}
                          onClick={() => console.log(`IconButton: ${style} ${state} ${size}`)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderButtonComponent = () => (
    <div className="component-section">
      <h2 className="component-section-title">Button Component</h2>
      <div className="component-grid-container">
        <div className="component-grid">
          {/* Header row with state labels */}
          <div className="component-grid-header">
            <div className="component-grid-header-cell"></div>
            {states.map((state) => (
              <div key={state} className="component-grid-header-cell">
                {state.charAt(0).toUpperCase() + state.slice(1)}
              </div>
            ))}
          </div>
          
          {/* Rows for each style */}
          {styles.map((style) => (
            <div key={style} className="component-grid-row">
              <div className="component-grid-row-label">
                {style.charAt(0).toUpperCase() + style.slice(1)}
              </div>
              {states.map((state) => (
                <div key={state} className="component-grid-cell">
                  <div className="component-grid-cell-content">
                    {sizes.map((size) => (
                      <div key={size} className="component-grid-item">
                        <div className="component-label">
                          {size.charAt(0).toUpperCase() + size.slice(1)}
                        </div>
                        <Button
                          label="Button"
                          showLeadingIcon={true}
                          showTrailingIcon={false}
                          style={style}
                          state={state}
                          size={size}
                          onClick={() => console.log(`Button: ${style} ${state} ${size}`)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderButtonDangerComponent = () => (
    <div className="component-section">
      <h2 className="component-section-title">ButtonDanger Component</h2>
      <div className="component-grid-container">
        <div className="component-grid">
          {/* Header row with state labels */}
          <div className="component-grid-header">
            <div className="component-grid-header-cell"></div>
            {states.map((state) => (
              <div key={state} className="component-grid-header-cell">
                {state.charAt(0).toUpperCase() + state.slice(1)}
              </div>
            ))}
          </div>
          
          {/* Rows for each style */}
          {dangerStyles.map((style) => (
            <div key={style} className="component-grid-row">
              <div className="component-grid-row-label">
                {style.charAt(0).toUpperCase() + style.slice(1)}
              </div>
              {states.map((state) => (
                <div key={state} className="component-grid-cell">
                  <div className="component-grid-cell-content">
                    {sizes.map((size) => (
                      <div key={size} className="component-grid-item">
                        <div className="component-label">
                          {size.charAt(0).toUpperCase() + size.slice(1)}
                        </div>
                        <ButtonDanger
                          label="Button"
                          showLeadingIcon={true}
                          showTrailingIcon={false}
                          style={style}
                          state={state}
                          size={size}
                          onClick={() => console.log(`ButtonDanger: ${style} ${state} ${size}`)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderInputFieldComponent = () => {
    const inputStates = [
      { key: 'default', label: 'Default' },
      { key: 'hover', label: 'Hover' },
      { key: 'focused', label: 'Focused' },
      { key: 'typing', label: 'Typing' },
      { key: 'filled', label: 'Filled' },
      { key: 'filledHover', label: 'Filled in - Hover' },
      { key: 'error', label: 'Error' },
      { key: 'disabled', label: 'Disabled' },
    ];

    const textAreaStates = [
      { key: 'default', label: 'Default' },
      { key: 'hover', label: 'Hover' },
      { key: 'focused', label: 'Focused' },
      { key: 'typing', label: 'Typing' },
      { key: 'filled', label: 'Filled' },
      { key: 'filledHover', label: 'Filled in - Hover' },
      { key: 'error', label: 'Error' },
      { key: 'disabled', label: 'Disabled' },
    ];

    const dropdownStates = [
      { key: 'default', label: 'Default' },
      { key: 'hover', label: 'Hover' },
      { key: 'selected', label: 'Selected' },
      { key: 'focused', label: 'Focused' },
      { key: 'error', label: 'Error' },
      { key: 'disabled', label: 'Disabled' },
    ];

    const searchStates = [
      { key: 'default', label: 'Default' },
      { key: 'hover', label: 'Hover' },
      { key: 'focused', label: 'Focused' },
      { key: 'typing', label: 'Typing' },
      { key: 'filled', label: 'Filled' },
      { key: 'filledHover', label: 'Filled in - Hover' },
      { key: 'error', label: 'Error' },
      { key: 'disabled', label: 'Disabled' },
    ];

    const listSearchStates = [
      { key: 'default', label: 'Default' },
      { key: 'hover', label: 'Hover' },
      { key: 'focused', label: 'Focused' },
      { key: 'typing', label: 'Typing' },
    ];

    const sampleChips = [
      { label: 'Label' },
      { label: 'Label' },
      { label: 'Label' },
    ];

    return (
      <>
        {/* InputField Section */}
        <div className="component-section">
          <h2 className="component-section-title">InputField Component</h2>
          <div className="component-inputfield-container">
            <div className="component-inputfield-grid">
              <div className="component-inputfield-row">
                {inputStates.map((state) => (
                  <div 
                    key={state.key} 
                    className="component-inputfield-cell"
                  >
                    <div className="component-inputfield-state-label">{state.label}</div>
                    <InputField
                      label="Label"
                      description="Description"
                      value={state.key === 'default' || state.key === 'hover' || state.key === 'focused' ? '' : 'Value'}
                      placeholder="Value"
                      error="Error"
                      hasLabel={true}
                      hasDescription={true}
                      hasError={true}
                      hasChips={false}
                      showIcon={false}
                      state={state.key}
                      disabled={state.key === 'disabled'}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* TextArea Section */}
        <div className="component-section">
          <h2 className="component-section-title">TextArea Component</h2>
          <div className="component-inputfield-container">
            <div className="component-inputfield-grid">
              <div className="component-inputfield-row">
                {textAreaStates.map((state) => (
                  <div 
                    key={state.key} 
                    className="component-inputfield-cell"
                  >
                    <div className="component-inputfield-state-label">{state.label}</div>
                    <TextArea
                      label="Label"
                      description="Description"
                      body={state.key === 'default' || state.key === 'hover' || state.key === 'focused' ? '' : 'Body'}
                      placeholder="Body"
                      error="Error"
                      hasLabel={true}
                      hasDescription={true}
                      hasError={true}
                      showIcon={false}
                      showTitle={false}
                      showDragIcon={true}
                      state={state.key}
                      disabled={state.key === 'disabled'}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Dropdown Section - Medium */}
        <div className="component-section">
          <h2 className="component-section-title">Dropdown Component - Medium</h2>
          <div className="component-inputfield-container">
            <div className="component-inputfield-grid">
              <div className="component-inputfield-row">
                {dropdownStates.map((state) => (
                  <div 
                    key={state.key} 
                    className="component-inputfield-cell"
                  >
                    <div className="component-inputfield-state-label">{state.label}</div>
                    <Dropdown
                      label="Label"
                      description="Description"
                      value={state.key === 'default' || state.key === 'hover' || state.key === 'focused' ? '' : 'Value'}
                      placeholder="Value"
                      error="Error"
                      hasLabel={true}
                      hasDescription={true}
                      hasError={false}
                      hasChips={false}
                      type="medium"
                      state={state.key}
                      disabled={state.key === 'disabled'}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Dropdown Section - Small */}
        <div className="component-section">
          <h2 className="component-section-title">Dropdown Component - Small</h2>
          <div className="component-inputfield-container">
            <div className="component-inputfield-grid">
              <div className="component-inputfield-row">
                {dropdownStates.map((state) => (
                  <div 
                    key={state.key} 
                    className="component-inputfield-cell"
                  >
                    <div className="component-inputfield-state-label">{state.label}</div>
                    <Dropdown
                      label="Label"
                      description="Description"
                      value={state.key === 'default' || state.key === 'hover' || state.key === 'focused' ? '' : 'Value'}
                      placeholder="Value"
                      error="Error"
                      hasLabel={true}
                      hasDescription={true}
                      hasError={false}
                      hasChips={false}
                      type="small"
                      state={state.key}
                      disabled={state.key === 'disabled'}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="component-section">
          <h2 className="component-section-title">Search Component</h2>
          <div className="component-inputfield-container">
            <div className="component-inputfield-grid">
              <div className="component-inputfield-row">
                {searchStates.map((state) => (
                  <div 
                    key={state.key} 
                    className="component-inputfield-cell"
                  >
                    <div className="component-inputfield-state-label">{state.label}</div>
                    <Search
                      value={state.key === 'default' || state.key === 'hover' || state.key === 'focused' ? '' : 'Search'}
                      placeholder="Search"
                      error="Error"
                      hasError={state.key === 'error'}
                      state={state.key}
                      disabled={state.key === 'disabled'}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ListSearch Section - Type 1 */}
        <div className="component-section">
          <h2 className="component-section-title">ListSearch Component - Type 1</h2>
          <div className="component-inputfield-container">
            <div className="component-inputfield-grid">
              <div className="component-inputfield-row">
                {listSearchStates.map((state) => (
                  <div 
                    key={state.key} 
                    className="component-inputfield-cell"
                  >
                    <div className="component-inputfield-state-label">{state.label}</div>
                    <ListSearch
                      label={state.key === 'default' || state.key === 'focused' ? 'Search' : state.key === 'typing' ? 'Search' : 'Search'}
                      chipList={true}
                      chips={sampleChips}
                      type="type1"
                      state={state.key}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ListSearch Section - Type 2 */}
        <div className="component-section">
          <h2 className="component-section-title">ListSearch Component - Type 2</h2>
          <div className="component-inputfield-container">
            <div className="component-inputfield-grid">
              <div className="component-inputfield-row">
                {listSearchStates.map((state) => (
                  <div 
                    key={state.key} 
                    className="component-inputfield-cell"
                  >
                    <div className="component-inputfield-state-label">{state.label}</div>
                    <ListSearch
                      label={state.key === 'default' || state.key === 'focused' ? 'Search' : state.key === 'typing' ? 'Search' : 'Search'}
                      chipList={true}
                      chips={sampleChips}
                      type="type2"
                      state={state.key}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderItemRowComponent = () => {
    const itemRowTypes = [
      { key: 'default', label: 'Default' },
      { key: 'hover', label: 'Hover' },
      { key: 'selected', label: 'Selected' },
      { key: 'disabled', label: 'Disabled' },
      { key: 'danger', label: 'Danger' },
    ];

    const listOfItemsTypes = [
      { key: 'default', label: 'Default (No Title)' },
      { key: 'variant2', label: 'Variant2 (With Title)' },
    ];

    return (
      <>
        <div className="component-section">
          <h2 className="component-section-title">ItemRow Component</h2>
          <div className="component-inputfield-container">
            <div className="component-inputfield-grid">
              <div className="component-inputfield-row">
                {itemRowTypes.map((type) => (
                  <div key={type.key} className="component-inputfield-cell">
                    <div className="component-inputfield-state-label">{type.label}</div>
                    <ItemRow
                      label="Item"
                      showLeftIcon={true}
                      showRightIcon={false}
                      showInfo={false}
                      hasCheckbox={false}
                      hasRadio={false}
                      type={type.key}
                      onClick={() => console.log(`ItemRow: ${type.key} clicked`)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="component-section">
          <h2 className="component-section-title">ListOfItems Component</h2>
          <div className="component-inputfield-container">
            <div className="component-inputfield-grid">
              {listOfItemsTypes.map((type) => (
                <div key={type.key} className="component-inputfield-row">
                  <div className="component-inputfield-cell">
                    <div className="component-inputfield-state-label">{type.label}</div>
                    <ListOfItems
                      title="Category"
                      type={type.key}
                      withTitle={type.key === 'variant2'}
                      open={true}
                      items={[
                        { label: 'Item', id: '1', hasRadio: type.key === 'variant2' },
                        { label: 'Item', id: '2', hasRadio: type.key === 'variant2' },
                        { label: 'Item', id: '3', hasRadio: type.key === 'variant2' },
                        { label: 'Item', id: '4', hasRadio: type.key === 'variant2' },
                        { label: 'Item', id: '5', hasRadio: type.key === 'variant2' },
                      ]}
                      onItemClick={(item) => console.log('Item clicked:', item)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="component-section">
          <h2 className="component-section-title">DropdownNestedColumn Component</h2>
          <div className="component-inputfield-container">
            <div className="component-inputfield-grid">
              <div className="component-inputfield-row">
                <div className="component-inputfield-cell">
                  <div className="component-inputfield-state-label">Expanded</div>
                  <DropdownNestedColumn
                    title="Title"
                    expanded={true}
                    chips={[
                      { label: 'Label', id: '1' },
                      { label: 'Label', id: '2' },
                      { label: 'Label', id: '3' },
                      { label: 'Label', id: '4' },
                    ]}
                    items={[
                      { label: 'Item', id: '1', hasCheckbox: true, checked: false },
                      { label: 'Item', id: '2', hasCheckbox: true, checked: false },
                      { label: 'Item', id: '3', hasCheckbox: true, checked: false },
                      { label: 'Item', id: '4', hasCheckbox: true, checked: false },
                      { label: 'Item', id: '5', hasCheckbox: true, checked: false },
                    ]}
                    onClearAll={() => console.log('Clear all clicked')}
                    onChipRemove={(chip) => console.log('Chip removed:', chip)}
                    onItemClick={(item) => console.log('Item clicked:', item)}
                  />
                </div>
                <div className="component-inputfield-cell">
                  <div className="component-inputfield-state-label">Collapsed</div>
                  <DropdownNestedColumn
                    title="Title"
                    expanded={false}
                    chips={[
                      { label: 'Label', id: '1' },
                      { label: 'Label', id: '2' },
                      { label: 'Label', id: '3' },
                      { label: 'Label', id: '4' },
                    ]}
                    items={[
                      { label: 'Item', id: '1', hasCheckbox: true, checked: false },
                      { label: 'Item', id: '2', hasCheckbox: true, checked: false },
                      { label: 'Item', id: '3', hasCheckbox: true, checked: false },
                      { label: 'Item', id: '4', hasCheckbox: true, checked: false },
                      { label: 'Item', id: '5', hasCheckbox: true, checked: false },
                    ]}
                    onClearAll={() => console.log('Clear all clicked')}
                    onChipRemove={(chip) => console.log('Chip removed:', chip)}
                    onItemClick={(item) => console.log('Item clicked:', item)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="component-section">
          <h2 className="component-section-title">DropdownNested Component</h2>
          <div className="component-inputfield-container">
            <div className="component-inputfield-grid">
              <div className="component-inputfield-row">
                <div className="component-inputfield-cell">
                  <div className="component-inputfield-state-label">Default</div>
                  <DropdownNested
                    leftColumn={{
                      title: 'Select a Member',
                      chips: [
                        { label: 'Label', id: '1' },
                        { label: 'Label', id: '2' },
                        { label: 'Label', id: '3' },
                        { label: 'Label', id: '4' },
                      ],
                      items: [
                        { label: 'Item', id: '1', hasCheckbox: true, checked: false },
                        { label: 'Item', id: '2', hasCheckbox: true, checked: true },
                        { label: 'Item', id: '3', hasCheckbox: true, checked: true },
                        { label: 'Item', id: '4', hasCheckbox: true, checked: false },
                        { label: 'Item', id: '5', hasCheckbox: true, checked: false },
                      ],
                    }}
                    rightColumn={{
                      title: 'Select a Group',
                      chips: [
                        { label: 'Label', id: '1' },
                        { label: 'Label', id: '2' },
                        { label: 'Label', id: '3' },
                        { label: 'Label', id: '4' },
                      ],
                      items: [
                        { label: 'Item', id: '1', hasCheckbox: true, checked: true },
                        { label: 'Item', id: '2', hasCheckbox: true, checked: false },
                        { label: 'Item', id: '3', hasCheckbox: true, checked: true },
                        { label: 'Item', id: '4', hasCheckbox: true, checked: false },
                        { label: 'Item', id: '5', hasCheckbox: true, checked: false },
                      ],
                    }}
                    onLeftClearAll={() => console.log('Left clear all clicked')}
                    onRightClearAll={() => console.log('Right clear all clicked')}
                    onLeftChipRemove={(chip) => console.log('Left chip removed:', chip)}
                    onRightChipRemove={(chip) => console.log('Right chip removed:', chip)}
                    onLeftItemClick={(item) => console.log('Left item clicked:', item)}
                    onRightItemClick={(item) => console.log('Right item clicked:', item)}
                    onCancel={() => console.log('Cancel clicked')}
                    onApply={() => console.log('Apply clicked')}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderNestedSectionComponent = () => {
    const chipStates = [
      { key: 'default', label: 'Default' },
      { key: 'hover', label: 'Hover' },
      { key: 'pressed', label: 'Pressed' },
      { key: 'active', label: 'Active' },
    ];

    const layouts = [
      { key: 'single', label: 'Single Row' },
      { key: 'double', label: 'Double Row' },
    ];

    const sampleChips = [
      { label: 'Label', id: '1' },
      { label: 'Label', id: '2' },
      { label: 'Label', id: '3' },
      { label: 'Label', id: '4' },
      { label: 'Label', id: '5' },
      { label: 'Label', id: '6' },
    ];

    const statusStates = [
      { key: 'default', label: 'Default' },
      { key: 'hover', label: 'Hover' },
      { key: 'pressed', label: 'Pressed' },
    ];

    const colors = ['green', 'yellow', 'red', 'blue'];

    const badgeTypes = [
      { key: 'active', label: 'Active' },
      { key: 'inactive', label: 'Inactive' },
      { key: 'default', label: 'Default' },
    ];

    return (
      <>
        {/* NestedSection Component */}
        <div className="component-section">
          <h2 className="component-section-title">NestedSection Component</h2>
          <div className="component-inputfield-container">
            <div className="component-inputfield-grid">
              <div className="component-inputfield-row">
                <div className="component-inputfield-cell">
                  <div className="component-inputfield-state-label">Default</div>
                  <NestedSection
                    canDrag={true}
                    onMoreClick={() => console.log('More clicked')}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chip Component */}
        <div className="component-section">
          <h2 className="component-section-title">Chip Component</h2>
          <div className="component-inputfield-container">
            <div className="component-inputfield-grid">
              <div className="component-inputfield-row">
                {chipStates.map((state) => (
                  <div key={state.key} className="component-inputfield-cell">
                    <div className="component-inputfield-state-label">{state.label}</div>
                    <Chip
                      label="Label"
                      showRightIcon={true}
                      showLeftIcon={true}
                      state={state.key}
                      size="medium"
                      onRemove={() => console.log('Chip removed')}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ChipList Component */}
        <div className="component-section">
          <h2 className="component-section-title">ChipList Component</h2>
          <div className="component-inputfield-container">
            <div className="component-inputfield-grid">
              {layouts.map((layout) => (
                <div key={layout.key} className="component-inputfield-row">
                  <div className="component-inputfield-cell">
                    <div className="component-inputfield-state-label">{layout.label}</div>
                    <ChipList
                      chips={sampleChips}
                      layout={layout.key}
                      onChipRemove={(chip) => console.log('Chip removed:', chip)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* StatusIndicator Component */}
        <div className="component-section">
          <h2 className="component-section-title">StatusIndicator Component</h2>
          <div className="component-inputfield-container">
            <div className="component-inputfield-grid">
              {colors.map((color) => (
                <div key={color} className="component-inputfield-row">
                  {statusStates.map((state) => (
                    <div key={state.key} className="component-inputfield-cell">
                      <div className="component-inputfield-state-label">
                        {color.charAt(0).toUpperCase() + color.slice(1)} - {state.label}
                      </div>
                      <StatusIndicator
                        label="Status"
                        state={state.key}
                        size="medium"
                        color={color}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Badge Component */}
        <div className="component-section">
          <h2 className="component-section-title">Badge Component</h2>
          <div className="component-inputfield-container">
            <div className="component-inputfield-grid">
              <div className="component-inputfield-row">
                {badgeTypes.map((type) => (
                  <div key={type.key} className="component-inputfield-cell">
                    <div className="component-inputfield-state-label">{type.label}</div>
                    <Badge
                      label="Badge"
                      size="medium"
                      type={type.key}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };


  return (
    <div className="component-library">
      <header className="component-library-header">
        <h1>Component Library</h1>
        <p>All Components - All Variants</p>
      </header>

      <div className="component-library-content">
        <div className="component-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`component-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="component-tab-content">
          {activeTab === 'iconbutton' && renderIconButtonComponent()}
          {activeTab === 'button' && renderButtonComponent()}
          {activeTab === 'buttondanger' && renderButtonDangerComponent()}
          {activeTab === 'inputfield' && renderInputFieldComponent()}
          {activeTab === 'nestedsection' && renderNestedSectionComponent()}
          {activeTab === 'itemrow' && renderItemRowComponent()}
        </div>
      </div>
    </div>
  );
};

export default ComponentLibrary;

