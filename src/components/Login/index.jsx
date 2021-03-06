/**
 * @file    Login component
 * @author  Ric Mershon 
 */

// External Dependencies

import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// Internal Dependencies

import * as routes from '../../constants/routes';
import { setAuthenticatedUser } from '../../actions/SessionActions';
import { GRAPHQL_SERVER_URL } from '../../constants';

/**
 * Login component
 * 
 * @returns Login component
 */

const Login = ({ setAuthenticatedUser, history }) => {

    // Local state varibles.

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    /**
     * Handle input changes.
     * 
     * @param {function} setter: function to set local state variable.
     * @param {object} event: synthetic browser event.
     */

    const handleChange = (setter) => (event) => {
        setter(event.target.value);
    }
    
    /**
     * Handle form submission.
     * 
     * @param {ojbect} event: synthetic browser event
     */

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const requestBody = {
                query: `
                    query {
                        authenticateUser(
                            email: "${email}", password: "${password}"
                        ) {
                            _id
                            token
                            email
                            firstName
                            lastName
                            organization
                            badgeNumber
                        }
                    }
                `
            };

            const { data } = await axios.post(
                GRAPHQL_SERVER_URL,
                requestBody
            )

            if (data.errors) {
                setError(data.errors[0].message);
                setLoading(false);
            } else {
                setError(null);
                setLoading(false);

                const { _id, token, firstName, lastName } = await data.data.authenticateUser;

                // Set authorized user in redux store, store token
                // in localStorage in browser and redirect user to
                // home page.

                setAuthenticatedUser(_id, email, firstName, lastName);
                localStorage.setItem('GRAPHQL_APP_TOKEN', token)
                history.push(routes.HOME);
            }
        } catch(error) {
            setError(error);
            setLoading(false);
            console.error('There was an error.', error)
        }
    }

    // Render component.

    return (
        <div>
            <h1>Login Page</h1>
            <div className="auth-form">
                <form onSubmit={handleSubmit}>
                    <input
                        className="form-input"
                        type="email"
                        placeholder="Email"
                        onChange={handleChange(setEmail)}
                    />
                    <input
                        className="form-input"
                        type="password"
                        placeholder="Password"
                        onChange={handleChange(setPassword)}
                    />
                    <div>
                        <span style={{color: "red"}}>{error || ''}</span>
                    </div>
                    <input
                        className="form-submit"
                        type="submit"
                        value={loading ? "Verifying..." : "LOGIN"}
                    />
                </form>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    setAuthenticatedUser: (_id, email, firstName, lastName) => dispatch(
        setAuthenticatedUser(_id, email, firstName, lastName)
    )
})

export default withRouter(connect(null, mapDispatchToProps)(Login));