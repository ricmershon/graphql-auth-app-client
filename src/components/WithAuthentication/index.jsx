/**
 * @file    Custom hook for authentication on main page load.
 * @author  Ric Mershon
 */

// External Dependencies

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

// Internal Dependencies

import { SESSION_ACTIONS } from '../../actions/SessionActions';
import { GRAPHQL_SERVER_URL } from '../../constants';

/**
 * authenticateUser() custom executes on page load and checks
 * the user's token against the token in the browser.
 * 
 * @param {function} dispatch: dispatch method for Redux React hook.
 */

const authenticateUser = async (dispatch) => {

    const token = localStorage.getItem('GRAPHQL_APP_TOKEN');

    if (token) {
        try {
            const requestBody = {
                query: `
                   query {
                       verifyToken(token: "${token}") {
                           _id
                           email
                       }
                   }
                `
            }

            const { data } = await axios.post(
                GRAPHQL_SERVER_URL, requestBody
            );
            const user = data.data.verifyToken;

            if (user) {
                dispatch({
                    type: SESSION_ACTIONS.SET_AUTH_USER,
                    payload: {
                        authenticatedUser: {
                            _id: user._id,
                            email: user.email
                        }
                    }
                })
            }
            else {
                dispatch({type: SESSION_ACTIONS.CLEAR_AUTH_USER });
                localStorage.removeItem('GRAPHQL_APP_TOKEN');
            }
        }
        catch {
            dispatch({ type: SESSION_ACTIONS.CLEAR_AUTH_USER });
        }
    }
    else {
        dispatch({ type: SESSION_ACTIONS.CLEAR_AUTH_USER });
    }
}

/**
 * userWithAuthenticate() is a custom hook that executes when a page loads
 * and calls authenticateUser() with the React Redux useDispatch() hook.
 */

function useWithAuthentication() {
    const dispatch = useDispatch();
    useEffect(() => { authenticateUser(dispatch) })
}

export default useWithAuthentication;

