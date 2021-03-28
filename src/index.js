/**
 * @file    Application configurataion and main entry point.
 * @author  Ric Mershon
 */

// External Dependencies

import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory';

// Internal Dependencies

import './index.css'
import App from './App';
import { Provider } from 'react-redux';
import store from './stores'
import { GRAPHQL_SERVER_URL } from './constants/index';

/**
 * Apollo Client Configuration:
 *
 * - HttpLink instance defines the GraphQL endpoint.
 * - InMemoryCache instance normalizes data, caches requests to avoid 
 *   duplicates,and make it possible to read and write data to the cache.
 * - onError instance for appllication level error handling.
 * - AppoloClient instance with HttpLink instance and InMemoryCache instance.
 */

const httpLink = new HttpLink({ uri: GRAPHQL_SERVER_URL })

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        console.log("There were GraphQL errors: ", graphQLErrors);
    }
    if (networkError) {
        console.log("There was a network error: ", networkError);
    }
})

const link = ApolloLink.from([errorLink, httpLink])
const cache = new InMemoryCache();
const apolloClient = new ApolloClient({ link, cache });

/**
 * @returns App wrapped by Apollo Client and Redux provider.
 */

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={apolloClient}>
            <Provider store={store}>
                <App />
            </Provider>
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
