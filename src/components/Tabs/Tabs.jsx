import React from 'react';
import './styles.css';

export const Tabs = ({ activeTab, setActiveTab, tabs }) => (
        <div className='tabs'>
            {tabs.map(el => (
                <button key={el.key} className={`tabs__item ${activeTab === el.key ? 'tabs__item_active' : ''}`} onClick={() => setActiveTab(el.key)}>
                    {el.name}
                </button>
            ))}
        </div>
    )
;