/**
 * @file    App main entry point
 * @author  Ric Mershon
 */

// External Dependencies

import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

// Internal Dependencies

import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './stores'

/**
 * @returns App wrapped by redux provider.
 */
ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
