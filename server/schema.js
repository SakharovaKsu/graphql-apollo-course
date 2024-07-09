const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type User {
    id: ID
    name: String
    email: String
    age: Int
    posts: [Post]
  }
  
  type Post { 
    id: ID
    title: String
    content: String
    author: User
  }
  
  # Входной тип UserInput для создания или обновления пользователя.
  input UserInput {  
    id: ID
    name: String!
    email: String
    age: Int!
    posts: [PostInput]
  }
  
  # Входной тип для создания или обновления записи.
  input PostInput {
    id: ID!
    title: String!
    content: String!
    author: UserInput
  }
  
  # Тип Query определяет доступные запросы.
  type Query {  
    getAllUsers: [User]
    getUser(id: ID!): User
  }
  
  # Тип Mutation определяет доступные мутации.
  type Mutation { 
    createUser(input: UserInput!): User
  }
`);

module.exports = schema;

// ! - так помечаем обязательные поля
