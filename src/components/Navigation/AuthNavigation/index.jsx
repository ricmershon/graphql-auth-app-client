/**
 * @file    Authorized navigation component
 * @author  Ric Mershon 
 */

// External Dependencies

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// Internal Dependencies

import * as routes from '../../../constants/routes';
import { clearAuthenticatedUser } from '../../../actions/SessionActions';

/**
 * AuthNavigation component
 * 
 * @returns AuthNavigation component
 */

const AuthNavigation = ({ clearAuthenticatedUser }) => {

    const firstName = "ric";
    
    /**
     * handleLogout() clears the user from state and the user's token
     * from the browser.
     */
    
    const handleLogout = () => {
        clearAuthenticatedUser();
        localStorage.removeItem('GRAPHQL_APP_TOKEN');
    }

    return (
        <div className='navbar'>
            <div className='navbar-left'>
                <Link to={routes.HOME}>HOME</Link>
            </div>
            <div className='navbar-right'>
                <Link to={routes.HOME} onClick={handleLogout}>
                    LOGOUT {firstName.toUpperCase()}
                </Link>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    authenticatedUserEmail: state.session.authenticatedUser.email
})

const mapDispatchToProps = (dispatch) => ({
    clearAuthenticatedUser: () => dispatch(clearAuthenticatedUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthNavigation);