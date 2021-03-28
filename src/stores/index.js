/**
 * @file    Redux store configuration
 * @author  Ric Mershon
 */

// External Dependencies

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';

// Internal Dependencies

import rootReducer from '../reducers';

// Configuration

const middleWares = [];
middleWares.push(logger);

const store = createStore(
    rootReducer, composeWithDevTools(applyMiddleware(...middleWares))
)

export default store;