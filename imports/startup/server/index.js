import { ApolloServer, gql } from 'apollo-server-express'
import { WebApp } from 'meteor/webapp'
import { getUser } from 'meteor/apollo'
import merge from 'lodash/merge'

// СХЕМЫ (Миграции)
const typeDefs = `
  type Query {
    hi: String
  }
`;

// КОНТРОЛЛЕРЫ
const resolvers = {
  Query: {
    hi() {
      return 'Hello World!'
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});
