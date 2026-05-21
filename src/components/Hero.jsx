import React from 'react';

function Hero() {
    const scrollToConstructor = () => {
        document.getElementById('constructor')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="hero">
            <h1>Собери свой автомобиль</h1>
            <p>Пошаговый конструктор с генерацией инструкции. Паттерн Builder в действии.</p>
            <button className="btn-primary" onClick={scrollToConstructor}>
                Начать сборку →
            </button>
            <div className="scroll-down" onClick={scrollToConstructor}>↓</div>
        </section>
    );
}

export default Hero;