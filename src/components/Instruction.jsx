import React from 'react';

function Instruction({ selectedEngine, selectedBody, selectedWheels, selectedOptions }) {
    const copyToClipboard = () => {
        const text = generateInstructionText();
        navigator.clipboard.writeText(text);
        alert('Инструкция скопирована в буфер обмена!');
    };

    const downloadTxt = () => {
        const text = generateInstructionText();
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'instruction.txt';
        a.click();
        URL.revokeObjectURL(url);
    };

    const generateInstructionText = () => {
        let text = " ИНСТРУКЦИЯ ПО СБОРКЕ АВТОМОБИЛЯ \n";
        if (selectedEngine) text += `1. Установлен двигатель: ${selectedEngine.name} (${selectedEngine.power} л.с.)\n`;
        if (selectedBody) text += `2. Создан кузов: ${selectedBody.name}\n`;
        if (selectedWheels) text += `3. Установлены колёса: ${selectedWheels.size} / ${selectedWheels.material}\n`;
        let optionNum = 4;
        selectedOptions.forEach(opt => {
            text += `[${optionNum}] Добавлена опция: ${opt.name}\n`;
            optionNum++;
        });
        text += " СБОРКА УСПЕШНО ЗАВЕРШЕНА\n";
        return text;
    };

    return (
        <div className="instruction" id="instruction">
            <h3>📋 Инструкция по сборке автомобиля</h3>
            <div className="instruction-content">
                <div className="instruction-line instruction-header"> ИНСТРУКЦИЯ ПО СБОРКЕ АВТОМОБИЛЯ </div>
                {selectedEngine && <div className="instruction-line">1. Установлен двигатель: {selectedEngine.name} ({selectedEngine.power} л.с.)</div>}
                {selectedBody && <div className="instruction-line">2. Создан кузов: {selectedBody.name}</div>}
                {selectedWheels && <div className="instruction-line">3. Установлены колёса: {selectedWheels.size} / {selectedWheels.material}</div>}
                {selectedOptions.map((opt, idx) => (
                    <div key={opt.id} className="instruction-line">[{idx + 4}] Добавлена опция: {opt.name}</div>
                ))}
                <div className="instruction-line instruction-footer"> СБОРКА УСПЕШНО ЗАВЕРШЕНА</div>
            </div>
            <div className="instruction-actions">
                <button className="btn-outline" onClick={copyToClipboard}>📋 Копировать инструкцию</button>
                <button className="btn-secondary" onClick={downloadTxt}>⬇️ Скачать как TXT</button>
            </div>
        </div>
    );
}

export default Instruction;