import React from 'react';
import { engines } from '../models/builder';

function EngineSelector({ selected, onSelect }) {
    return (
        <div className="selector-grid">
            {engines.map(engine => (
                <div
                    key={engine.id}
                    className={`selector-card ${selected?.id === engine.id ? 'selected' : ''}`}
                    onClick={() => onSelect(engine)}
                >
                    <div className="card-icon">🔧</div>
                    <div className="card-title">{engine.name}</div>
                    <div className="card-power">{engine.power} л.с.</div>
                    <div className="card-price">+${engine.price}</div>
                    <div className="card-description">{engine.description}</div>
                </div>
            ))}
        </div>
    );
}

export default EngineSelector;