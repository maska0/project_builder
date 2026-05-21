import React from 'react';
import { templates } from '../models/builder';

function Templates({ onLoadTemplate }) {
    const getTemplatePrice = (template) => {
        let total = 0;
        total += template.engine.price;
        total += template.body.price;
        total += template.wheels.price;
        template.options.forEach(opt => total += opt.price);
        return total;
    };

    const getTemplateIcon = (name) => {
        if (name === 'Эконом') return '💰';
        if (name === 'Стандарт') return '📊';
        if (name === 'Премиум') return '💎';
        return '🏎️';
    };

    return (
        <div className="templates" id="templates">
            <h2>🎯 Быстрые шаблоны</h2>
            <div className="templates-grid">
                {Object.entries(templates).map(([key, template]) => (
                    <div key={key} className="template-card" onClick={() => onLoadTemplate(template)}>
                        <div className="template-icon">{getTemplateIcon(template.name)}</div>
                        <div className="template-name">{template.name}</div>
                        <div className="template-price">${getTemplatePrice(template)}</div>
                        <div className="template-specs">
                            {template.engine.name.split(' ')[0]} | {template.body.name} | {template.wheels.size}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Templates;