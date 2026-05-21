import React, { useState, useEffect } from 'react';
import './styles/App.css';  // ← ПРОВЕРЬТЕ ЭТУ СТРОЧКУ

// Компоненты
function Header({ onClear }) {
    const scrollToSection = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <header className="header">
            <div className="logo">
                <span className="logo-text">CarBuilder</span>
            </div>
            <nav className="nav">
                <a onClick={() => scrollToSection('constructor')}>Конструктор</a>
                <a onClick={() => scrollToSection('how-it-works')}>Как это работает</a>
                <a onClick={() => scrollToSection('templates')}>Готовые шаблоны</a>
                <a onClick={() => scrollToSection('about')}>О проекте</a>
            </nav>
            <div className="header-actions">
                <button className="btn-outline" onClick={onClear}>🗑️ Очистить всё</button>
                <button className="btn-secondary">💾 Сохранить</button>
                <div className="avatar">👤</div>
            </div>
        </header>
    );
}

function Hero() {
    const scrollToConstructor = () => {
        document.getElementById('constructor')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="hero">
            <h1>Собери свой автомобиль</h1>
            <p>Пошаговый конструктор с генерацией инструкции. Паттерн Builder в действии.</p>
            <button className="btn-primary" onClick={scrollToConstructor}>Начать сборку →</button>
            <div className="scroll-down" onClick={scrollToConstructor}>↓</div>
        </section>
    );
}

function ProgressBar({ steps, currentStep }) {
    return (
        <div className="progress-bar-container">
            <div className="progress-steps">
                {steps.map((step, index) => (
                    <div key={step.id} className="progress-step">
                        <div className={`progress-circle ${step.completed ? 'completed' : ''} ${currentStep === step.id ? 'active' : ''}`}>
                            {step.completed ? '✓' : step.id}
                        </div>
                        <div className="progress-label">{step.name}</div>
                        {index < steps.length - 1 && (
                            <div className={`progress-line ${step.completed ? 'completed' : ''}`}></div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

// Данные
const engines = [
    { id: 1, name: "1.6 л бензин", power: 95, price: 0, description: "Экономичный базовый двигатель" },
    { id: 2, name: "2.0 л дизель", power: 150, price: 500, description: "Баланс мощности и экономии" },
    { id: 3, name: "2.5 л гибрид", power: 200, price: 1200, description: "Экономичный и мощный" },
    { id: 4, name: "3.0 л турбо", power: 300, price: 2500, description: "Максимальная мощность" }
];

const bodies = [
    { id: 1, name: "Седан", type: "sedan", price: 0, description: "Классический 4-дверный" },
    { id: 2, name: "Внедорожник (SUV)", type: "suv", price: 800, description: "Высокий клиренс, полный привод" },
    { id: 3, name: "Хэтчбек", type: "hatchback", price: 300, description: "Компактный и маневренный" }
];

const wheels = [
    { id: 1, size: "R16", material: "Сталь", price: 0 },
    { id: 2, size: "R17", material: "Легкосплавные", price: 400 },
    { id: 3, size: "R18", material: "Легкосплавные", price: 700 },
    { id: 4, size: "R19", material: "Кованые", price: 1200 }
];

const optionsData = [
    { id: 1, name: "Кондиционер", price: 300 },
    { id: 2, name: "Парктроник", price: 200 },
    { id: 3, name: "Камера заднего вида", price: 400 },
    { id: 4, name: "Подогрев сидений", price: 250 },
    { id: 5, name: "Кожаный салон", price: 800 },
    { id: 6, name: "Аудиосистема премиум", price: 500 }
];

const templates = {
    economy: { name: "Эконом", engine: engines[0], body: bodies[0], wheels: wheels[0], options: [] },
    standard: { name: "Стандарт", engine: engines[1], body: bodies[1], wheels: wheels[1], options: [optionsData[0]] },
    premium: { name: "Премиум", engine: engines[2], body: bodies[1], wheels: wheels[2], options: [optionsData[0], optionsData[4], optionsData[5]] },
    sport: { name: "Спорт", engine: engines[3], body: bodies[2], wheels: wheels[3], options: [optionsData[5]] }
};

// Компонент выбора двигателя
function EngineSelector({ selected, onSelect }) {
    return (
        <div className="selector-grid">
            {engines.map(engine => (
                <div key={engine.id} className={`selector-card ${selected?.id === engine.id ? 'selected' : ''}`} onClick={() => onSelect(engine)}>
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

function BodySelector({ selected, onSelect }) {
    const getBodyIcon = (type) => {
        if (type === 'sedan') return '🚗';
        if (type === 'suv') return '🚙';
        return '🚘';
    };
    return (
        <div className="selector-grid">
            {bodies.map(body => (
                <div key={body.id} className={`selector-card ${selected?.id === body.id ? 'selected' : ''}`} onClick={() => onSelect(body)}>
                    <div className="card-icon">{getBodyIcon(body.type)}</div>
                    <div className="card-title">{body.name}</div>
                    <div className="card-price">+${body.price}</div>
                    <div className="card-description">{body.description}</div>
                </div>
            ))}
        </div>
    );
}

function WheelsSelector({ selected, onSelect }) {
    return (
        <div className="selector-grid">
            {wheels.map(wheel => (
                <div key={wheel.id} className={`selector-card ${selected?.id === wheel.id ? 'selected' : ''}`} onClick={() => onSelect(wheel)}>
                    <div className="card-title">{wheel.size}</div>
                    <div className="card-material">{wheel.material}</div>
                    <div className="card-price">+${wheel.price}</div>
                </div>
            ))}
        </div>
    );
}

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
            {optionsData.map(option => (
                <div key={option.id} className={`option-card ${selected.find(o => o.id === option.id) ? 'selected' : ''}`} onClick={() => toggleOption(option)}>
                    <div className="option-checkbox">{selected.find(o => o.id === option.id) ? '✓' : '☐'}</div>
                    <div className="option-info">
                        <div className="option-name">{option.name}</div>
                        <div className="option-price">+${option.price}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}

function CarConfigurator({ currentStep, setCurrentStep, selectedEngine, setSelectedEngine, selectedBody, setSelectedBody, selectedWheels, setSelectedWheels, selectedOptions, setSelectedOptions, setCar, onGenerateInstruction }) {
    const handleNext = () => {
        if (currentStep < 4) {
            setCurrentStep(currentStep + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleComplete = () => {
        const car = {
            parts: { engine: selectedEngine, body: selectedBody, wheels: selectedWheels, options: selectedOptions },
            instructions: []
        };
        setCar(car);
        onGenerateInstruction();
        setCurrentStep(5);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1: return <EngineSelector selected={selectedEngine} onSelect={setSelectedEngine} />;
            case 2: return <BodySelector selected={selectedBody} onSelect={setSelectedBody} />;
            case 3: return <WheelsSelector selected={selectedWheels} onSelect={setSelectedWheels} />;
            case 4: return <OptionsSelector selected={selectedOptions} onSelect={setSelectedOptions} />;
            default: return null;
        }
    };

    const isStepValid = () => {
        if (currentStep === 1) return selectedEngine !== null;
        if (currentStep === 2) return selectedBody !== null;
        if (currentStep === 3) return selectedWheels !== null;
        return true;
    };

    const getStepTitle = () => {
        switch (currentStep) {
            case 1: return "Выберите двигатель";
            case 2: return "Выберите кузов";
            case 3: return "Выберите колёса";
            case 4: return "Дополнительные опции";
            default: return "";
        }
    };

    return (
        <div className="car-configurator" id="constructor">
            <div className="configurator-left">
                <div className="car-visualization">
                    <div className="car-placeholder">
                        <div className="car-image">{selectedBody?.type === 'suv' ? '🚙' : '🚗'}</div>
                        <div className="car-specs">
                            <div className="spec-item">Двигатель: {selectedEngine?.name || 'Не выбран'}</div>
                            <div className="spec-item">Кузов: {selectedBody?.name || 'Не выбран'}</div>
                            <div className="spec-item">Колёса: {selectedWheels?.size || 'Не выбраны'}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="configurator-right">
                <div className="step-header">
                    <h2>Шаг {currentStep} из 4</h2>
                    <h3>{getStepTitle()}</h3>
                </div>
                <div className="step-content">{renderStepContent()}</div>
                <div className="step-actions">
                    {currentStep > 1 && <button className="btn-outline" onClick={() => setCurrentStep(currentStep - 1)}>← Назад</button>}
                    {currentStep < 4 ? (
                        <button className="btn-primary" onClick={handleNext} disabled={!isStepValid()}>Далее →</button>
                    ) : (
                        <button className="btn-primary" onClick={handleComplete} disabled={!isStepValid()}>Собрать автомобиль →</button>
                    )}
                </div>
            </div>
        </div>
    );
}

function Summary({ selectedEngine, selectedBody, selectedWheels, selectedOptions, onGenerateInstruction }) {
    const calculateTotal = () => {
        let total = 0;
        if (selectedEngine) total += selectedEngine.price;
        if (selectedBody) total += selectedBody.price;
        if (selectedWheels) total += selectedWheels.price;
        if (selectedOptions) selectedOptions.forEach(opt => total += opt.price);
        return total;
    };

    if (!selectedEngine && !selectedBody && !selectedWheels && selectedOptions.length === 0) return null;

    return (
        <div className="summary">
            <h3>📋 Ваша сборка</h3>
            <div className="summary-content">
                <div className="summary-items">
                    {selectedEngine && <div className="summary-item"><span>Двигатель: {selectedEngine.name}</span><span>+${selectedEngine.price}</span></div>}
                    {selectedBody && <div className="summary-item"><span>Кузов: {selectedBody.name}</span><span>+${selectedBody.price}</span></div>}
                    {selectedWheels && <div className="summary-item"><span>Колёса: {selectedWheels.size} {selectedWheels.material}</span><span>+${selectedWheels.price}</span></div>}
                    {selectedOptions.map(opt => <div key={opt.id} className="summary-item"><span>{opt.name}</span><span>+${opt.price}</span></div>)}
                </div>
                <div className="summary-total"><div className="total-price">${calculateTotal()}</div><div>Общая стоимость</div></div>
            </div>
            <div className="summary-actions"><button className="btn-primary" onClick={onGenerateInstruction}>Сгенерировать инструкцию →</button></div>
        </div>
    );
}

function Instruction({ selectedEngine, selectedBody, selectedWheels, selectedOptions }) {
    const generateInstructionText = () => {
        let text = " ИНСТРУКЦИЯ ПО СБОРКЕ АВТОМОБИЛЯ \n";
        if (selectedEngine) text += `1. Установлен двигатель: ${selectedEngine.name} (${selectedEngine.power} л.с.)\n`;
        if (selectedBody) text += `2. Создан кузов: ${selectedBody.name}\n`;
        if (selectedWheels) text += `3. Установлены колёса: ${selectedWheels.size} / ${selectedWheels.material}\n`;
        selectedOptions.forEach((opt, idx) => text += `[${idx + 4}] Добавлена опция: ${opt.name}\n`);
        text += "СБОРКА УСПЕШНО ЗАВЕРШЕНА\n";
        return text;
    };

    const copyToClipboard = () => { navigator.clipboard.writeText(generateInstructionText()); alert('Инструкция скопирована!'); };
    const downloadTxt = () => {
        const blob = new Blob([generateInstructionText()], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'instruction.txt';
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="instruction" id="instruction">
            <h3>📋 Инструкция по сборке автомобиля</h3>
            <div className="instruction-content">
                <div className="instruction-line instruction-header">ИНСТРУКЦИЯ ПО СБОРКЕ АВТОМОБИЛЯ</div>
                {selectedEngine && <div className="instruction-line">[1] Установлен двигатель: {selectedEngine.name} ({selectedEngine.power} л.с.)</div>}
                {selectedBody && <div className="instruction-line">[2] Создан кузов: {selectedBody.name}</div>}
                {selectedWheels && <div className="instruction-line">[3] Установлены колёса: {selectedWheels.size} / {selectedWheels.material}</div>}
                {selectedOptions.map((opt, idx) => <div key={opt.id} className="instruction-line">[{idx + 4}] Добавлена опция: {opt.name}</div>)}
                <div className="instruction-line instruction-footer">СБОРКА УСПЕШНО ЗАВЕРШЕНА</div>
            </div>
            <div className="instruction-actions">
                <button className="btn-outline" onClick={copyToClipboard}>📋 Копировать инструкцию</button>
                <button className="btn-secondary" onClick={downloadTxt}>⬇️ Скачать как TXT</button>
            </div>
        </div>
    );
}

function Templates({ onLoadTemplate }) {
    const getTemplatePrice = (t) => t.engine.price + t.body.price + t.wheels.price + t.options.reduce((s, o) => s + o.price, 0);
    const getTemplateIcon = (name) => {
        if (name === 'Эконом') return '💰';
        if (name === 'Стандарт') return '📊';
        if (name === 'Премиум') return '💎';
        return '🏎️';
    };
    return (
        <div className="templates" id="templates">
            <h2>Быстрые шаблоны</h2>
            <div className="templates-grid">
                {Object.entries(templates).map(([key, template]) => (
                    <div key={key} className="template-card" onClick={() => onLoadTemplate(template)}>
                        <div className="template-icon">{getTemplateIcon(template.name)}</div>
                        <div className="template-name">{template.name}</div>
                        <div className="template-price">${getTemplatePrice(template)}</div>
                        <div className="template-specs">{template.engine.name.split(' ')[0]} | {template.body.name} | {template.wheels.size}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function HowItWorks() {
    return (
        <div className="how-it-works" id="how-it-works">
            <h2>Как работает паттерн Builder ?</h2>
            <div className="cards-grid">
                <div className="info-card"><div className="card-number">1</div><div className="info-icon">🏭</div><h3>Продукт (Car)</h3><p>Финальный автомобиль со всеми параметрами</p></div>
                <div className="info-card"><div className="card-number">2</div><div className="info-icon">📐</div><h3>Строитель (Builder)</h3><p>Интерфейс для пошаговой сборки</p></div>
                <div className="info-card"><div className="card-number">3</div><div className="info-icon">🔨</div><h3>Конкретный строитель</h3><p>SedanBuilder / SUVBuilder</p></div>
                <div className="info-card"><div className="card-number">4</div><div className="info-icon">🎮</div><h3>Директор (Director)</h3><p>Управляет последовательностью шагов</p></div>
            </div>
            <div className="diagram">
                <h3>📊 Схема работы паттерна</h3>
                <div className="diagram-flow">
                    <div className="diagram-item">Клиент</div><div className="diagram-arrow">→</div>
                    <div className="diagram-item">Директор</div><div className="diagram-arrow">→</div>
                    <div className="diagram-item">Строитель</div><div className="diagram-arrow">→</div>
                    <div className="diagram-item">Продукт</div>
                </div>
            </div>
        </div>
    );
}

function Footer() {
    return (
        <footer className="footer" id="about">
            <div className="footer-content">
                <div className="footer-logo"><span>CarBuilder</span></div>
                <div className="footer-copyright">© 2026 CarBuilder — Демонстрация паттерна Builder</div>
            </div>
        </footer>
    );
}

// ГЛАВНЫЙ КОМПОНЕНТ APP
function App() {
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedEngine, setSelectedEngine] = useState(null);
    const [selectedBody, setSelectedBody] = useState(null);
    const [selectedWheels, setSelectedWheels] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [car, setCar] = useState(null);
    const [showInstruction, setShowInstruction] = useState(false);

    const steps = [
        { id: 1, name: "Двигатель", completed: selectedEngine !== null },
        { id: 2, name: "Кузов", completed: selectedBody !== null },
        { id: 3, name: "Колёса", completed: selectedWheels !== null },
        { id: 4, name: "Опции", completed: true },
        { id: 5, name: "Готово", completed: car !== null }
    ];

    const handleGenerateInstruction = () => {
        setShowInstruction(true);
        setTimeout(() => document.getElementById('instruction')?.scrollIntoView({ behavior: 'smooth' }), 100);
    };

    const handleClearAll = () => {
        setSelectedEngine(null);
        setSelectedBody(null);
        setSelectedWheels(null);
        setSelectedOptions([]);
        setCar(null);
        setShowInstruction(false);
        setCurrentStep(1);
    };

    const handleLoadTemplate = (template) => {
        setSelectedEngine(template.engine);
        setSelectedBody(template.body);
        setSelectedWheels(template.wheels);
        setSelectedOptions(template.options);
        setCar(null);
        setShowInstruction(false);
        setCurrentStep(4);
    };

    return (
        <div className="app">
            <Header onClear={handleClearAll} />
            <Hero />
            <ProgressBar steps={steps} currentStep={currentStep} />
            <CarConfigurator
                currentStep={currentStep} setCurrentStep={setCurrentStep}
                selectedEngine={selectedEngine} setSelectedEngine={setSelectedEngine}
                selectedBody={selectedBody} setSelectedBody={setSelectedBody}
                selectedWheels={selectedWheels} setSelectedWheels={setSelectedWheels}
                selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions}
                setCar={setCar} onGenerateInstruction={handleGenerateInstruction}
            />
            <Summary selectedEngine={selectedEngine} selectedBody={selectedBody} selectedWheels={selectedWheels} selectedOptions={selectedOptions} onGenerateInstruction={handleGenerateInstruction} />
            {showInstruction && <Instruction selectedEngine={selectedEngine} selectedBody={selectedBody} selectedWheels={selectedWheels} selectedOptions={selectedOptions} />}
            <Templates onLoadTemplate={handleLoadTemplate} />
            <HowItWorks />
            <Footer />
        </div>
    );
}

export default App;