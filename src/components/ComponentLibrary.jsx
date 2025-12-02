import React, { useState } from 'react';
import IconButton from './ui/IconButton/IconButton';
import Button from './ui/Button/Button';
import './ComponentLibrary.css';

const ComponentLibrary = () => {
  const [activeTab, setActiveTab] = useState('iconbutton');
  const styles = ['primary', 'secondary', 'neutral', 'subtle'];
  const states = ['default', 'hover', 'focus', 'disabled', 'loading'];
  const sizes = ['medium', 'small'];

  const tabs = [
    { id: 'iconbutton', label: 'IconButton' },
    { id: 'button', label: 'Button' },
  ];

  const renderIconButtonComponent = () => (
    <div className="component-section">
      <h2 className="component-section-title">IconButton Component</h2>
      {styles.map((style) => (
        <div key={style} className="component-subsection">
          <h3 className="component-subsection-title">
            Style: {style.charAt(0).toUpperCase() + style.slice(1)}
          </h3>
          
          <div className="component-variants">
            {states.map((state) => (
              <div key={state} className="component-variant-group">
                <h4 className="component-variant-title">
                  State: {state.charAt(0).toUpperCase() + state.slice(1)}
                </h4>
                <div className="component-variant-row">
                  {sizes.map((size) => (
                    <div key={size} className="component-variant-item">
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
        </div>
      ))}
    </div>
  );

  const renderButtonComponent = () => (
    <div className="component-section">
      <h2 className="component-section-title">Button Component</h2>
      {styles.map((style) => (
        <div key={style} className="component-subsection">
          <h3 className="component-subsection-title">
            Style: {style.charAt(0).toUpperCase() + style.slice(1)}
          </h3>
          
          <div className="component-variants">
            {states.map((state) => (
              <div key={state} className="component-variant-group">
                <h4 className="component-variant-title">
                  State: {state.charAt(0).toUpperCase() + state.slice(1)}
                </h4>
                <div className="component-variant-row">
                  {sizes.map((size) => (
                    <div key={size} className="component-variant-item">
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
        </div>
      ))}
    </div>
  );

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
        </div>
      </div>
    </div>
  );
};

export default ComponentLibrary;

