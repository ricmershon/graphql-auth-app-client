/**
 * @file    Authorized and non-authorized home components combined into a
 *          single component and route.
 * @author  Ric Mershon 
 */

// External Dependencies

import { connect } from 'react-redux';

// Internal Dependencies

import AuthHome from './AuthHome';
import NonAuthHome from './NonAuthHome';

/**
 * Home component
 * 
 * @param {object} authentictedUser: user object from state. 
 * @returns Home component
 */

const Home = ({ authenticatedUser }) => (
    authenticatedUser ? <AuthHome /> : <NonAuthHome />
)

const mapStateToProps = (state) => ({
    authenticatedUser: state.session.authenticatedUser
})

export default connect(mapStateToProps)(Home);