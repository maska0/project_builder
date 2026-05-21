import React from 'react';
import EngineSelector from './EngineSelector';
import BodySelector from './BodySelector';
import WheelsSelector from './WheelsSelector';
import OptionsSelector from './OptionsSelector';
import { Director, SedanBuilder, SUVBuilder } from '../models/builder';

function CarConfigurator({
    currentStep,
    setCurrentStep,
    selectedEngine,
    setSelectedEngine,
    selectedBody,
    setSelectedBody,
    selectedWheels,
    setSelectedWheels,
    selectedOptions,
    setSelectedOptions,
    setCar,
    onGenerateInstruction
}) {
    const handleNext = () => {
        if (currentStep < 4) {
            setCurrentStep(currentStep + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleComplete = () => {
        const builder = selectedBody?.type === 'suv' ? new SUVBuilder() : new SedanBuilder();
        const director = new Director(builder);
        const car = director.construct(selectedEngine, selectedBody, selectedWheels, selectedOptions);
        setCar(car);
        onGenerateInstruction();
        setCurrentStep(5);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return <EngineSelector selected={selectedEngine} onSelect={setSelectedEngine} />;
            case 2:
                return <BodySelector selected={selectedBody} onSelect={setSelectedBody} />;
            case 3:
                return <WheelsSelector selected={selectedWheels} onSelect={setSelectedWheels} />;
            case 4:
                return <OptionsSelector selected={selectedOptions} onSelect={setSelectedOptions} />;
            default:
                return null;
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
                        <div className="car-image">
                            {selectedBody?.type === 'suv' ? '🚙' : '🚗'}
                        </div>
                        <div className="car-specs">
                            <div className="spec-item">
                                Двигатель: {selectedEngine?.name || 'Не выбран'}
                            </div>
                            <div className="spec-item">
                                Кузов: {selectedBody?.name || 'Не выбран'}
                            </div>
                            <div className="spec-item">
                                Колёса: {selectedWheels?.size || 'Не выбраны'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="configurator-right">
                <div className="step-header">
                    <h2>Шаг {currentStep} из 4</h2>
                    <h3>{getStepTitle()}</h3>
                </div>
                <div className="step-content">
                    {renderStepContent()}
                </div>
                <div className="step-actions">
                    {currentStep > 1 && (
                        <button className="btn-outline" onClick={() => setCurrentStep(currentStep - 1)}>
                            ← Назад
                        </button>
                    )}
                    {currentStep < 4 ? (
                        <button className="btn-primary" onClick={handleNext} disabled={!isStepValid()}>
                            Далее →
                        </button>
                    ) : (
                        <button className="btn-primary" onClick={handleComplete} disabled={!isStepValid()}>
                            Собрать автомобиль →
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CarConfigurator;