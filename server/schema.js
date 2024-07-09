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
    
  input UserInput {  
    id: ID
    name: String!
    email: String
    age: Int!
    posts: [PostInput]
  }
  
  input PostInput {
    id: ID!
    title: String!
    content: String!
    author: UserInput
  }
  
  type Query {  
    getAllUsers: [User]
    getUser(id: ID!): User
  }
  
  type Mutation { 
    createUser(input: UserInput!): User
  }
`);

module.exports = schema;

// ! - так помечаем обязательные поля
