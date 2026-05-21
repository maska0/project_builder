import React from 'react';

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
                <button className="btn-outline" onClick={onClear}>
                    🗑️ Очистить всё
                </button>
                <button className="btn-secondary">
                    💾 Сохранить
                </button>
                <div className="avatar">👤</div>
            </div>
        </header>
    );
}

export default Header;