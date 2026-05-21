import React from 'react';
import { bodies } from '../models/builder';

function BodySelector({ selected, onSelect }) {
    const getBodyIcon = (type) => {
        if (type === 'sedan') return '🚗';
        if (type === 'suv') return '🚙';
        return '🚘';
    };

    return (
        <div className="selector-grid">
            {bodies.map(body => (
                <div
                    key={body.id}
                    className={`selector-card ${selected?.id === body.id ? 'selected' : ''}`}
                    onClick={() => onSelect(body)}
                >
                    <div className="card-icon">{getBodyIcon(body.type)}</div>
                    <div className="card-title">{body.name}</div>
                    <div className="card-price">+${body.price}</div>
                    <div className="card-description">{body.description}</div>
                </div>
            ))}
        </div>
    );
}

export default BodySelector;