import React from 'react'
import { Meteor } from 'meteor/meteor'
import { render } from 'react-dom'
import { Accounts } from 'meteor/accounts-base'
import { ApolloClient } from "apollo-client"
import { HttpLink } from "apollo-link-http"
import { WebSocketLink } from "apollo-link-ws"
import { ApolloLink, split } from "apollo-link"
import { InMemoryCache } from "apollo-cache-inmemory"
import { ApolloProvider } from '@apollo/react-hooks'
import { getMainDefinition } from "apollo-utilities"

// КОМПОНЕНТЫ (Виды)
import App from '../../ui/App'

// Конфиг ссылок
const httpLink = new HttpLink();
const middlewareLink = new ApolloLink((operation, forward) => {
    operation.setContext({
        headers: {
            Authorization: Accounts._storedLoginToken(),
        },
    });

    return forward(operation)
});
const httpLinkAuth = middlewareLink.concat(httpLink);
const wsLink = new WebSocketLink({
    uri: `${window.location.origin}/subscriptions`.replace(/^http/, "ws"),
    options: {
        reconnect: true,
        connectionParams: {
            authToken: Accounts._storedLoginToken(),
        },
    },
});
const link = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return definition.kind === "OperationDefinition" && definition.operation === "subscription";
    },
    wsLink,
    httpLinkAuth,
);

// Инициализация Клиента
const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
});

// Обёртка пролижения
const ApolloApp = () => (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
);

Meteor.startup(() => {
  render(<ApolloApp />, document.getElementById('app'))
})
