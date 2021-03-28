/**
 * @file    Non-authorized navigation component
 * @author  Ric Mershon
 */

// External Dependencies

import { Link } from 'react-router-dom';

// Internal Dependencies

import * as routes from '../../../constants/routes';

/**
 * NonAuthNavigation component
 * 
 * @returns NonAuthNavigation component
 */

const NonAuthNavigation = () => (
    <div className='navbar'>
        <div className='navbar-left'>
            <Link to={routes.HOME}>HOME</Link>
        </div>
        <div className='navbar-right'>
            <Link to={routes.SIGN_UP}>SIGN UP</Link>
            <Link to={routes.LOGIN}>LOGIN</Link>
        </div>
    </div>
)

export default NonAuthNavigation;