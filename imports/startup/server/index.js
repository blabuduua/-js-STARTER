import { ApolloServer, gql } from 'apollo-server-express'
import { WebApp } from 'meteor/webapp'
import { getUser } from 'meteor/apollo'
import merge from 'lodash/merge'

import UsersSchema from '../../api/users/Users.graphql'
import UserSchema from '../../api/users/User.graphql'
import UsersResolvers from '../../api/users/resolvers'
import UserResolvers from '../../api/users/userResolvers'

// Update 1

// СХЕМЫ (Миграции)
const TestsSchema = `
  type Query {
    hi: String
    users: [Users]
    user: User
  }
`;

const typeDefs = [
    TestsSchema,
    UsersSchema,
    UserSchema
];

// КОНТРОЛЛЕРЫ
const TestResolvers = {
  Query: {
    hi() {
      return 'Hello World!'
    }
  }
};

const resolvers = merge(
    UsersResolvers,
    UserResolvers,
    TestResolvers
);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, connection }) => {
        if (connection) {
          // check connection for metadata
          return connection.context;
        } else {
          // check from req
          const token = req.headers.authorization || "";

          return { user: await getUser(token) };
        }
    },
  subscriptions: {
        path: "/subscriptions",
        onConnect: async (connectionParams, webSocket, context) => {
            console.log(`Subscription client connected using Apollo server's built-in SubscriptionServer.`)
        },
        onDisconnect: async (webSocket, context) => {
            console.log(`Subscription client disconnected.`)
        }
    }
});

server.applyMiddleware({
    app: WebApp.connectHandlers,
});

server.installSubscriptionHandlers(WebApp.httpServer);
