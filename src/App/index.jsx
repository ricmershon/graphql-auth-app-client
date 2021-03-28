/**
 * @file    Entry point from index.js
 * @author  Ric Mershon
 */

// External Dependencies

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Internal Dependencies

import './App.css';
import * as routes from '../constants/routes';
import Home from '../components/Home'
import PageNotFound from '../components/PageNotFound'
import SignUp from '../components/SignUp';
import Login from '../components/Login';
import Navigation from '../components/Navigation';
import useWithAuthentication from '../components/WithAuthentication'

/**
 * App: Main app component
 * 
 * @returns main app container and router context
 */

const App = () => {

    // Custom hook for authentication on page load.

    useWithAuthentication();

    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <div className="App">
                <Navigation />
                <header className="App-header">
                    <Switch>
                        <Route
                            exact path={routes.HOME}
                            component={() => <Home />}
                        />
                        <Route
                            exact path={routes.SIGN_UP}
                            component={() => <SignUp />}
                        />
                        <Route
                            exact path={routes.LOGIN}
                            component={() => <Login />}
                        />
                        <Route component={PageNotFound} />
                    </Switch>
                </header>
            </div>
        </BrowserRouter>
    )
}

export default App;