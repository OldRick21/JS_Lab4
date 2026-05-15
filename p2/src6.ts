interface Logger {
  log(message: string): void;
}

class OldLogger {
  writeLog(timestamp: string, message: string): void {
    console.log(`[${timestamp}] ${message}`);
  }
}

class LoggerAdapter implements Logger {
  private oldLogger: OldLogger;

  constructor(oldLogger: OldLogger) {
    this.oldLogger = oldLogger;
  }

  log(message: string): void {
    const timestamp = new Date().toISOString();
    this.oldLogger.writeLog(timestamp, message);
  }
}

const logger: Logger = new LoggerAdapter(new OldLogger());
logger.log("Приложение запущено");
logger.log("Пользователь вошёл");

interface SortStrategy {
  sort(data: number[]): number[];
}

class BubbleSort implements SortStrategy {
  sort(data: number[]): number[] {
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

class QuickSort implements SortStrategy {
  sort(data: number[]): number[] {
    if (data.length <= 1) return data;
    const pivot = data[0];
    const left = data.slice(1).filter(x => x <= pivot);
    const right = data.slice(1).filter(x => x > pivot);
    return [...this.sort(left), pivot, ...this.sort(right)];
  }
}

class Sorter {
  private strategy: SortStrategy;

  constructor(strategy: SortStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: SortStrategy): void {
    this.strategy = strategy;
  }

  sort(data: number[]): number[] {
    return this.strategy.sort(data);
  }
}

const sorter = new Sorter(new BubbleSort());
console.log("BubbleSort:", sorter.sort([5, 2, 8, 1, 9]));
sorter.setStrategy(new QuickSort());
console.log("QuickSort:", sorter.sort([5, 2, 8, 1, 9]));

interface Observer {
  update(event: string, data: unknown): void;
}

interface Subject {
  subscribe(observer: Observer): void;
  unsubscribe(observer: Observer): void;
  notify(event: string, data: unknown): void;
}

class Shop implements Subject {
  private observers: Observer[] = [];
  private price: number = 0;

  subscribe(observer: Observer): void {
    this.observers.push(observer);
  }

  unsubscribe(observer: Observer): void {
    this.observers = this.observers.filter(o => o !== observer);
  }

  notify(event: string, data: unknown): void {
    this.observers.forEach(o => o.update(event, data));
  }

  setPrice(price: number): void {
    this.price = price;
    this.notify("priceChanged", { price: this.price });
  }
}

class EmailNotifier implements Observer {
  private email: string;

  constructor(email: string) {
    this.email = email;
  }

  update(event: string, data: unknown): void {
    if (
      event === "priceChanged" &&
      typeof data === "object" &&
      data !== null &&
      "price" in data
    ) {
      console.log(`[Email → ${this.email}] Новая цена: ${(data as {price: number}).price} руб.`);
    }
  }
}

class PriceLogger implements Observer {
  update(event: string, data: unknown): void {
    console.log(`[LOG] Событие: ${event}`, data);
  }
}

const shop = new Shop();
const alice = new EmailNotifier("alice@example.com");
const bob   = new EmailNotifier("bob@example.com");
const plog  = new PriceLogger();

shop.subscribe(alice);
shop.subscribe(bob);
shop.subscribe(plog);

shop.setPrice(1500);

shop.unsubscribe(bob);
shop.setPrice(1200);
