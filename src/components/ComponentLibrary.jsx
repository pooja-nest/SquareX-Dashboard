import React, { useState } from 'react';
import IconButton from './ui/IconButton/IconButton';
import Button from './ui/Button/Button';
import ButtonDanger from './ui/ButtonDanger/ButtonDanger';
import InputField from './ui/InputField/InputField';
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

    return (
      <div className="component-section">
        <h2 className="component-section-title">InputField Component</h2>
        <div className="component-inputfield-container">
          <div className="component-inputfield-grid">
            {/* Single row showing all states horizontally */}
            <div className="component-inputfield-row">
              {inputStates.map((state) => (
                <div 
                  key={state.key} 
                  className="component-inputfield-cell"
                >
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
                    title={state.label}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
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
        </div>
      </div>
    </div>
  );
};

export default ComponentLibrary;

