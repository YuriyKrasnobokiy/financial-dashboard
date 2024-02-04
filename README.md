# MyApp

##

1 ДЛЯ ПОЧАТКУ РОБОТИ СКЛОНУЙТЕ СОБІ РЕПОЗИТОРІЙ НА МАШИНУ.

##

2 ВСТАНОВІТЬ ЗАЛЕЖНОСТІ (В КОНСОЛІ ПРОПИСАТИ npm install)

##

3 В КОНСОЛІ ПРОПИШІТЬ КОМАНДУ npm start (або ng serve)

##

4 ЯКЩО АВТОМАТИЧНО НЕ ВІДКРИЛАСЬ ВКЛАДКА В БРАУЗЕРІ ТО ПРОПИШІТЬ В АДРЕСНІЙ СТРОЦІ БРАУЗЕРА http://localhost:4200/financial-dashboard

##

В дашборді не виконав останній фільтр, панель для виводу метрики, адаптив для мобільних пристроїв.

##

## Завдання 2 (Фінансовий дашборд):

Створити невеликий фінансовий дашборд на Angular з використанням Bootstrap та RxJS.

### Технічні вимоги до виконання завдання:

1. Завдання має бути виконаним з використанням **Angular 15+** та **Bootstrap** (дозволяється використання віджетів з **NG Bootstrap**)**.**
2. Усі маніпуляції з даними (отримання, фільтрування, обчислення метрик) мають виконуватися з використанням операторів **RxJS.**
3. Дозволяється використання **signals** (Angular 16+).
4. Перехід між сторінками має відбуватися з використанням **Angular Router**.
5. Сторінки мають бути адаптивними та мінімалістичними. Для стилізування використовувати стилі з **Bootstrap** (дозволяється додавати кастомні стилі та/або модифікувати стилі з **Bootstrap**).
6. Код повинен бути написаний з урахуванням загальноприйнятих практик та стандартів розробки.
7. Весь код повинен бути залитий на **GitHub** та мати README-файл з описом запуску проєкту та описом виконаного завдання.

### Вимоги до виконання завдання:

1. Створити панель навігації з двома посиланнями: “**Загальна таблиця**” та “**Коротка інформація**”.
2. Для сторінки “**Загальна таблиця**” створити таблицю для відображення даних, які завантажуються з наступної кінцевої точки API (метод GET): https://raw.githubusercontent.com/LightOfTheSun/front-end-coding-task-db/master/db.json.
3. Додати на сторінку фільтри, які впливають на дані, що відображаються у таблиці. **Використовувати оператори RxJS для маніпуляції даними.**
   - Фільтр періоду дат видачі кредиту (_issuance_date_)
   - Фільтр періоду дат повернення кредиту (_actual_return_date_)
   - Фільтр для відображення прострочених кредитів (в яких дата _actual_return_date > return_date_ або _return_date_ менше за сьогодні і _actual_return_date_ порожнє).
4. Для сторінки “**Коротка інформація**” створити панель, що містить наступні метрики (використати дані з тієї ж кінцевої точки API (метод GET) https://raw.githubusercontent.com/LightOfTheSun/front-end-coding-task-db/master/db.json):
   - Загальна кількість виданих кредитів по місяцях (дата видачі кредиту - поле _issuance_date_).
   - Середня сума видачі кредитів по місяцях (поле _body_).
   - Загальна сума виданих кредитів по місяцях (поле _body_).
   - Загальна сума нарахованих відсотків по місяцях (поле _percent_).
   - Загальна кількість повернених кредитів по місяцях (поле _actual_return_date_ **не** пусте).

<aside>
📌 Для групування по місяцях використовувати поле *issuance_date* (дата видачі кредиту). Наприклад, для метрики “Кількість повернених кредитів за січень 2021” - порахувати кількість кредитів, в яких поле *actual_return_date* **не** пусте, і які були видані в період з 01.01.2021 по 31.01.2021 включно.

</aside>

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.10.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
