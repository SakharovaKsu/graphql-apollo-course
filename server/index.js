const express = require('express'); // express: библиотека для создания веб-серверов на Node.js.
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const schema = require('./schema');

const users = [
  { id: 1,
    name: 'Football',
    email: 'football@gmail.com',
    age: 45,
  },
];

const createUser = (input) => {
  const id = Date.now();
  return { id, ...input };
};

const app = express();
app.use(cors());

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

app.use('/graphql', graphqlHTTP({
  graphiql: true,
  schema,
  rootValue: root,
}));

app.listen(5000, () => console.log('Server is started on port 5000'));
