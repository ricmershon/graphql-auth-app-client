/**
 * @file    Redux root reducer
 * @author  Ric Mershon
 */

// External Dependencies

import { combineReducers } from 'redux';

// Internal Dependencies

import sessionReducer from './SessionReducer';

// Configuration

const rootReducer = combineReducers({ session: sessionReducer });

export default rootReducer;