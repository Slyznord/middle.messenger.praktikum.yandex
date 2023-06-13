# Приложение чата | Yandex Practicum
Приложение чата написано с использованием шаблонизатора [Handlebars](https://handlebarsjs.com/), препроцессора [SCSS](https://sass-lang.com/), TypeScript, Eslint и Stylelint.
Для отрисовки клиентской части реализован базовый класс компонента с помощью которого происходит инициализация и отрисовка компонентов на клиенте.
Для отправки и обработки запросов реализован класс HTTPTransport. Для работы с WebSocket так же написан класс Socket.
Написаны тесты для BaseComponent, Router и HTTPTransport. Сборка и запуск приложения могут осуществляться через Docker. Так же используется
Husky для прогона тестов перед коммитом.

## Запуск контейнера с пирложением через Docker
Сборка контейнера
```bash
npm run docker:build
```

Запуск приложения
```bash
npm run docker:run
```

## Запуск приложения локально
Установка зависимостей
```bash
npm i
```

Запуск проекта
```
npm run start
```

Сборка проекта
```
npm run build
```

Запуск Eslint
```
npx eslint src/
```

Запуск Stylelint
```
npx stylelint "**/*.scss"
```

Запуск тестов
```bash
npm run test
```

[Макет проекта в Figma](https://www.figma.com/file/y0LRYc9p4MyIIKFl0zWJ0Q/YandexPracticum.Chat?node-id=1%3A105&t=ALIRiNnkCr55eIWe-1)

Ссылка на проект: https://wondrous-starship-2abec8.netlify.app/
