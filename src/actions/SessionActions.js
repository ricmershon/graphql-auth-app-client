/**
 * @file    Actions for Session object
 * @author  Ric Mershon
 */

// External Dependencies

let keyMirror = require('keymirror');

// Configuration

export const SESSION_ACTIONS = keyMirror({
    SET_AUTH_USER: null,
    CLEAR_AUTH_USER: null
})

/**
 * Sets authenticated user in the Redux store.
 * 
 * @param {string} _id: database id associated with user record.
 * @param {string} email: user's email address
 */

export const setAuthenticatedUser = (_id, email) => ({
    type: SESSION_ACTIONS.SET_AUTH_USER,
    payload: {
        authenticatedUser: {
            _id: _id,
            email: email
        }
    }
})

/**
 * Clears authenticated user from the Redux store.
 * 
 * @returns 
 */

export const clearAuthenticatedUser = () => ({
    type: SESSION_ACTIONS.CLEAR_AUTH_USER
})
