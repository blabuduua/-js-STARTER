import { ApolloServer, gql } from 'apollo-server-express'
import { WebApp } from 'meteor/webapp'
import { getUser } from 'meteor/apollo'
import merge from 'lodash/merge'
import UsersSchema from '../../api/users/Users.graphql'

// СХЕМЫ (Миграции)
const TestsSchema = `
  type Query {
    hi: String
    users: [Users]
  }
`;

const typeDefs = [
    TestsSchema,
    UsersSchema
];

// КОНТРОЛЛЕРЫ
const resolvers = {
  Query: {
    hi() {
      return 'Hello World!'
    },
    users() {
      return [
        {
          _id: '123',
          name: 'Matrix'
        },
        {
          _id: '1234',
          name: 'Matrix2'
        }
      ]
    }
  }
};

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
