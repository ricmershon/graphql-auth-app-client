/**
 * @file    SessionReducer for redux store.
 * @author  Ric Mershon
 */

// Internal Dependencies

import { SESSION_ACTIONS } from '../actions/SessionActions';

// Configuration

const INITIAL_SESSION_STATE = {
    authenticatedUser: null
}

/**
 * sessionReducer: redux reducer for session state.
 * 
 * @param {object} state: object containing redux state
 * @param {object} action: object containing action type and payload.
 * @returns new redux state
 */

const sessionReducer = (state = INITIAL_SESSION_STATE, action) => {

    switch (action.type) {
        
        case SESSION_ACTIONS.SET_AUTH_USER: {
            return { 
                ...state,
                authenticatedUser: action.payload.authenticatedUser
            }
        }

        case SESSION_ACTIONS.CLEAR_AUTH_USER: {
            return {
                ...state,
                authenticatedUser: INITIAL_SESSION_STATE.authenticatedUser
            }
        }

        default: return state;
    }
}

export default sessionReducer;