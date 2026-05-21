import React from 'react';
import { wheels } from '../models/builder';

function WheelsSelector({ selected, onSelect }) {
    return (
        <div className="selector-grid">
            {wheels.map(wheel => (
                <div
                    key={wheel.id}
                    className={`selector-card ${selected?.id === wheel.id ? 'selected' : ''}`}
                    onClick={() => onSelect(wheel)}
                >
                    <div className="card-icon">⚙️</div>
                    <div className="card-title">{wheel.size}</div>
                    <div className="card-material">{wheel.material}</div>
                    <div className="card-price">+${wheel.price}</div>
                </div>
            ))}
        </div>
    );
}

export default WheelsSelector;