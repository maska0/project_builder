import React from 'react';

function HowItWorks() {
    return (
        <div className="how-it-works" id="how-it-works">
            <h2>Как работает паттерн Builder ?</h2>
            <div className="cards-grid">
                <div className="info-card">
                    <div className="card-number">1</div>
                    <div className="info-icon">🏭</div>
                    <h3>Продукт (Car)</h3>
                    <p>Финальный автомобиль со всеми параметрами и опциями</p>
                </div>
                <div className="info-card">
                    <div className="card-number">2</div>
                    <div className="info-icon">📐</div>
                    <h3>Строитель (Builder)</h3>
                    <p>Интерфейс для пошаговой сборки автомобиля</p>
                </div>
                <div className="info-card">
                    <div className="card-number">3</div>
                    <div className="info-icon">🔨</div>
                    <h3>Конкретный строитель</h3>
                    <p>SedanBuilder / SUVBuilder — реализация для каждого типа</p>
                </div>
                <div className="info-card">
                    <div className="card-number">4</div>
                    <div className="info-icon">🎮</div>
                    <h3>Директор (Director)</h3>
                    <p>Управляет последовательностью шагов сборки</p>
                </div>
            </div>
            <div className="diagram">
                <h3>📊 Схема работы паттерна</h3>
                <div className="diagram-flow">
                    <div className="diagram-item">Клиент</div>
                    <div className="diagram-arrow">→</div>
                    <div className="diagram-item">Директор</div>
                    <div className="diagram-arrow">→</div>
                    <div className="diagram-item">Строитель</div>
                    <div className="diagram-arrow">→</div>
                    <div className="diagram-item">Продукт</div>
                </div>
            </div>
        </div>
    );
}

export default HowItWorks;