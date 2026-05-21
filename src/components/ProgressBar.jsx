import React from 'react';

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

export default ProgressBar;