const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const schema = require('./schema');

const users = [
  {
    id: 1,
    username: 'Football',
    age: 45,
    posts: [],
  },
];

// Функция для создания нового пользователя. Генерирует уникальный id на основе текущего времени.
const createUser = (input) => {
  const id = Date.now();
  return { id, ...input };
};

const app = express();
app.use(cors());

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

app.listen(5000, () => console.log('Server is started on port 5000'));
