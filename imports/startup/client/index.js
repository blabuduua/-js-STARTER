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
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"

// КОМПОНЕНТЫ (Виды)
import App from '../../ui/App'
import Test from '../../ui/Test/Test'

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
const apolloClient = new ApolloClient({
    link,
    cache: new InMemoryCache(),
});

function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/', state: {from: props.location}}} />}
    />
  )
}

Meteor.startup(() => {
  render(
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <Switch>
            <Route path="/" exact component={ App }/>
            <PrivateRoute authed={true} path='/test' component={Test} />
        </Switch>
      </BrowserRouter>
    </ApolloProvider>, document.getElementById('app'));
})
