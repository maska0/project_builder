// ========== ПРОДУКТ (CAR) ==========
class Car {
    constructor() {
        this.parts = {};
        this.instructions = [];
    }

    addPart(key, value) {
        this.parts[key] = value;
    }

    addInstruction(step) {
        this.instructions.push(step);
    }

    getParts() {
        return this.parts;
    }

    getInstructions() {
        return this.instructions;
    }

    getTotalPrice() {
        let total = 0;
        for (let key in this.parts) {
            if (this.parts[key].price) {
                total += this.parts[key].price;
            }
        }
        return total;
    }

    display() {
        return {
            parts: this.parts,
            instructions: this.instructions,
            totalPrice: this.getTotalPrice()
        };
    }
}

// ========== АБСТРАКТНЫЙ СТРОИТЕЛЬ ==========
class CarBuilder {
    constructor() {
        this.car = new Car();
    }

    buildEngine(engine) {
        throw new Error("Метод buildEngine должен быть реализован");
    }

    buildBody(body) {
        throw new Error("Метод buildBody должен быть реализован");
    }

    buildWheels(wheels) {
        throw new Error("Метод buildWheels должен быть реализован");
    }

    addOption(option) {
        throw new Error("Метод addOption должен быть реализован");
    }

    getCar() {
        return this.car;
    }
}

// ========== КОНКРЕТНЫЙ СТРОИТЕЛЬ (SEDAN) ==========
class SedanBuilder extends CarBuilder {
    buildEngine(engine) {
        this.car.addPart("engine", engine);
        this.car.addInstruction(`Установлен двигатель: ${engine.name} (${engine.power} л.с.)`);
        return this;
    }

    buildBody(body) {
        this.car.addPart("body", body);
        this.car.addInstruction(`Создан кузов: ${body.name}`);
        return this;
    }

    buildWheels(wheels) {
        this.car.addPart("wheels", wheels);
        this.car.addInstruction(`Установлены колёса: ${wheels.size} / ${wheels.material}`);
        return this;
    }

    addOption(option) {
        const options = this.car.parts.options || [];
        options.push(option);
        this.car.addPart("options", options);
        this.car.addInstruction(`Добавлена опция: ${option.name}`);
        return this;
    }
}

// ========== КОНКРЕТНЫЙ СТРОИТЕЛЬ (SUV) ==========
class SUVBuilder extends CarBuilder {
    buildEngine(engine) {
        this.car.addPart("engine", engine);
        this.car.addInstruction(`Установлен двигатель: ${engine.name} (${engine.power} л.с.)`);
        return this;
    }

    buildBody(body) {
        this.car.addPart("body", body);
        this.car.addInstruction(`Создан кузов: ${body.name}`);
        return this;
    }

    buildWheels(wheels) {
        this.car.addPart("wheels", wheels);
        this.car.addInstruction(`Установлены колёса: ${wheels.size} / ${wheels.material}`);
        return this;
    }

    addOption(option) {
        const options = this.car.parts.options || [];
        options.push(option);
        this.car.addPart("options", options);
        this.car.addInstruction(`Добавлена опция: ${option.name}`);
        return this;
    }
}

// ========== ДИРЕКТОР ==========
class Director {
    constructor(builder) {
        this.builder = builder;
    }

    construct(engine, body, wheels, options = []) {
        this.builder.buildEngine(engine);
        this.builder.buildBody(body);
        this.builder.buildWheels(wheels);
        options.forEach(option => this.builder.addOption(option));
        return this.builder.getCar();
    }
}

// ========== ДАННЫЕ ДЛЯ ВЫБОРА ==========
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

const options = [
    { id: 1, name: "Кондиционер", price: 300 },
    { id: 2, name: "Парктроник", price: 200 },
    { id: 3, name: "Камера заднего вида", price: 400 },
    { id: 4, name: "Подогрев сидений", price: 250 },
    { id: 5, name: "Кожаный салон", price: 800 },
    { id: 6, name: "Аудиосистема премиум", price: 500 }
];

const templates = {
    economy: {
        name: "Эконом",
        engine: engines[0],
        body: bodies[0],
        wheels: wheels[0],
        options: []
    },
    standard: {
        name: "Стандарт",
        engine: engines[1],
        body: bodies[1],
        wheels: wheels[1],
        options: [options[0]]
    },
    premium: {
        name: "Премиум",
        engine: engines[2],
        body: bodies[1],
        wheels: wheels[2],
        options: [options[0], options[4], options[5]]
    },
    sport: {
        name: "Спорт",
        engine: engines[3],
        body: bodies[2],
        wheels: wheels[3],
        options: [options[5]]
    }
};

export {
    Car,
    SedanBuilder,
    SUVBuilder,
    Director,
    engines,
    bodies,
    wheels,
    options,
    templates
};