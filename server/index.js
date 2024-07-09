const express = require('express'); // библиотека для создания веб-серверов на Node.js.
const { graphqlHTTP } = require('express-graphql'); // для интеграции GraphQL с Express.
const cors = require('cors'); // middleware для разрешения запросов из других доменов.
const schema = require('./schema');

const users = [
  {
    id: 1,
    name: 'Football',
    email: 'football@gmail.com',
    age: 45,
  },
];

// Функция для создания нового пользователя. Генерирует уникальный id на основе текущего времени.
const createUser = (input) => {
  const id = Date.now();
  return { id, ...input };
};

const app = express(); // Создание экземпляра Express.
app.use(cors()); // Использование middleware CORS для разрешения запросов из других доменов.

// Определение корневого резолвера для обработчиков запросов и мутаций.
const root = {
  getAllUsers: () => {
    return users;
  },

  getUser: ({ id }) => {
    return users.find(user => user.id === parseInt(id));
  },

  createUser: ({ input }) => {
    const user = createUser(input);
    users.push(user);
    return user;
  }
};

// Настройка маршрута для GraphQL с использованием middleware express-graphql.
app.use('/graphql', graphqlHTTP({
  graphiql: true, // Включение интерфейса GraphiQL для тестирования запросов.
  schema,
  rootValue: root, // Использование корневого резолвера для обработки запросов и мутаций.
}));

// Запуск сервера на порту 5000.
app.listen(5000, () => console.log('Server is started on port 5000'));
