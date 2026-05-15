"use strict";
class OldLogger {
    writeLog(timestamp, message) {
        console.log(`[${timestamp}] ${message}`);
    }
}
class LoggerAdapter {
    oldLogger;
    constructor(oldLogger) {
        this.oldLogger = oldLogger;
    }
    log(message) {
        const timestamp = new Date().toISOString();
        this.oldLogger.writeLog(timestamp, message);
    }
}
const logger = new LoggerAdapter(new OldLogger());
logger.log("Приложение запущено");
logger.log("Пользователь вошёл");
class BubbleSort {
    sort(data) {
        const arr = [...data];
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr.length - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                }
            }
        }
        return arr;
    }
}
class QuickSort {
    sort(data) {
        if (data.length <= 1)
            return data;
        const pivot = data[0];
        const left = data.slice(1).filter(x => x <= pivot);
        const right = data.slice(1).filter(x => x > pivot);
        return [...this.sort(left), pivot, ...this.sort(right)];
    }
}
class Sorter {
    strategy;
    constructor(strategy) {
        this.strategy = strategy;
    }
    setStrategy(strategy) {
        this.strategy = strategy;
    }
    sort(data) {
        return this.strategy.sort(data);
    }
}
const sorter = new Sorter(new BubbleSort());
console.log("BubbleSort:", sorter.sort([5, 2, 8, 1, 9]));
sorter.setStrategy(new QuickSort());
console.log("QuickSort:", sorter.sort([5, 2, 8, 1, 9]));
class Shop {
    observers = [];
    price = 0;
    subscribe(observer) {
        this.observers.push(observer);
    }
    unsubscribe(observer) {
        this.observers = this.observers.filter(o => o !== observer);
    }
    notify(event, data) {
        this.observers.forEach(o => o.update(event, data));
    }
    setPrice(price) {
        this.price = price;
        this.notify("priceChanged", { price: this.price });
    }
}
class EmailNotifier {
    email;
    constructor(email) {
        this.email = email;
    }
    update(event, data) {
        if (event === "priceChanged" &&
            typeof data === "object" &&
            data !== null &&
            "price" in data) {
            console.log(`[Email → ${this.email}] Новая цена: ${data.price} руб.`);
        }
    }
}
class PriceLogger {
    update(event, data) {
        console.log(`[LOG] Событие: ${event}`, data);
    }
}
const shop = new Shop();
const alice = new EmailNotifier("alice@example.com");
const bob = new EmailNotifier("bob@example.com");
const plog = new PriceLogger();
shop.subscribe(alice);
shop.subscribe(bob);
shop.subscribe(plog);
shop.setPrice(1500);
shop.unsubscribe(bob);
shop.setPrice(1200);
