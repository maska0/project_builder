import React from 'react';
import { options } from '../models/builder';

function OptionsSelector({ selected, onSelect }) {
    const toggleOption = (option) => {
        if (selected.find(o => o.id === option.id)) {
            onSelect(selected.filter(o => o.id !== option.id));
        } else {
            onSelect([...selected, option]);
        }
    };

    return (
        <div className="options-grid">
            {options.map(option => (
                <div
                    key={option.id}
                    className={`option-card ${selected.find(o => o.id === option.id) ? 'selected' : ''}`}
                    onClick={() => toggleOption(option)}
                >
                    <div className="option-checkbox">
                        {selected.find(o => o.id === option.id) ? '✓' : '☐'}
                    </div>
                    <div className="option-info">
                        <div className="option-name">{option.name}</div>
                        <div className="option-price">+${option.price}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default OptionsSelector;