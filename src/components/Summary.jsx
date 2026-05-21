import React from 'react';

function Summary({ selectedEngine, selectedBody, selectedWheels, selectedOptions, onGenerateInstruction }) {
    const calculateTotal = () => {
        let total = 0;
        if (selectedEngine) total += selectedEngine.price;
        if (selectedBody) total += selectedBody.price;
        if (selectedWheels) total += selectedWheels.price;
        if (selectedOptions) {
            selectedOptions.forEach(opt => total += opt.price);
        }
        return total;
    };

    if (!selectedEngine && !selectedBody && !selectedWheels && selectedOptions.length === 0) {
        return null;
    }

    return (
        <div className="summary">
            <h3> Ваша сборка</h3>
            <div className="summary-content">
                <div className="summary-items">
                    {selectedEngine && (
                        <div className="summary-item">
                            <span>Двигатель: {selectedEngine.name}</span>
                            <span>+${selectedEngine.price}</span>
                        </div>
                    )}
                    {selectedBody && (
                        <div className="summary-item">
                            <span>Кузов: {selectedBody.name}</span>
                            <span>+${selectedBody.price}</span>
                        </div>
                    )}
                    {selectedWheels && (
                        <div className="summary-item">
                            <span>Колёса: {selectedWheels.size} {selectedWheels.material}</span>
                            <span>+${selectedWheels.price}</span>
                        </div>
                    )}
                    {selectedOptions.map(opt => (
                        <div key={opt.id} className="summary-item">
                            <span>{opt.name}</span>
                            <span>+${opt.price}</span>
                        </div>
                    ))}
                </div>
                <div className="summary-total">
                    <div className="total-price">${calculateTotal()}</div>
                    <div>Общая стоимость</div>
                </div>
            </div>
            <div className="summary-actions">
                <button className="btn-primary" onClick={onGenerateInstruction}>
                    Сгенерировать инструкцию →
                </button>
            </div>
        </div>
    );
}

export default Summary;