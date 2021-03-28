/**
 * @file    Authorized and non-authorized navigation components combined
 *          into a single component and route.
 * @author  Ric Mershon 
 */

// External Dependencies

import { connect } from 'react-redux';

// Internal components

import AuthNavigation from './AuthNavigation';
import NonAuthNavigation from './NonAuthNavigation';

/**
 * 
 * @param {object} authenticatedUser: user object from state. 
 * @returns 
 */

const Navigation = ({ authenticatedUser }) => (
    authenticatedUser ? <AuthNavigation /> : <NonAuthNavigation />
)

const mapStateToProps = (state) => ({
    authenticatedUser: state.session.authenticatedUser
})

export default connect(mapStateToProps)(Navigation);