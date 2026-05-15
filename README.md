# Лабораторная работа 4 — SCSS/SASS/LESS и TypeScript

**Темы:** CSS-препроцессоры, статическая типизация, перегрузки функций, структуры данных, паттерны проектирования.

---

## p1 — CSS-препроцессоры

Каждая задача реализована в трёх синтаксисах: SCSS, SASS (отступы) и LESS.  
Скрипт `bin.sh` запускает watcher-компиляторы (`sass --watch`, `lessc`).

### t2 — Числа 1–100 с градиентной раскраской
`src.scss` / `src.sass` / `src.less`  
- Цикл `@for $n from 1 through 100` генерирует 100 классов `.num-1`…`.num-100`.
- Цвет каждого числа рассчитывается через `rgb($n, 256 - $n, 0)` — плавный переход от зелёного к красному.
- Вложенность селекторов и `flex-wrap` для сетки чисел.

### t3 — Макет страницы на миксинах и переменных
`src.scss` / `src.sass` / `src.less`  
Полноценный лейаут: header → navbar → hero → три колонки → footer.
- Переменные: `$bg-block`, `$color-link`, `$gap`.
- Два миксина: `@mixin block` (серый блок с паддингом) и `@mixin flex-center`.
- `BEM`-нотация через `&__logo`, `&:hover`, `darken()`.
- `box-sizing: border-box` глобально через `*`.

---

## p2 — TypeScript

Файлы компилируются через `tsc` (скрипт `bin.sh`, конфиг `tsconfig.json`).  
Скомпилированные `.js` файлы рядом с исходниками.

### src2.ts — Интерфейс и класс
Интерфейс `IUser { name, age, hello() }` → класс `User implements IUser` с явными аннотациями типов.

### src3.ts — Type alias
То же самое через `type TUser = { ... }` вместо `interface` — демонстрирует разницу подходов.

### src4.ts — Перегрузка функций
Функция `distance()` с двумя сигнатурами: через четыре числа `(x1, y1, x2, y2)` и через два объекта `(Point, Point)`.  
Реализация через `typeof`-проверки и union-типы.

### src5.ts — Бинарное дерево поиска
Полная реализация BST с типами:
- `TreeNode` — узел дерева (`value`, `left`, `right`).
- `BinarySearchTree` — методы `insert`, `search`, `delete`, `update`, `height`, `inorder`.
- Используются `private` поля и рекурсивные вспомогательные методы.

### src6.ts — Паттерны проектирования (GoF)
Три паттерна на TypeScript с интерфейсами:
| Паттерн | Что реализовано |
|---------|-----------------|
| Adapter | `LoggerAdapter` оборачивает `OldLogger.writeLog(timestamp, msg)` под интерфейс `Logger.log(msg)` |
| Strategy | `Sorter` принимает `SortStrategy`; реализации — `BubbleSort` и `QuickSort`, переключаемые в рантайме |
| Observer | `Shop` рассылает событие `priceChanged` подписчикам `EmailNotifier` и `PriceLogger` |
