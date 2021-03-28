/**
 * @file    SignUp component
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

/**
 * SignUp component.
 * 
 * @returns SignUp component
 */

const SignUp = ({ setAuthenticatedUser, history }) => {

    // Local state variables.

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    // Handle state change

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
                    mutation {
                        createUser(userInput: {
                            email: "${email}"
                            password: "${password}"
                            confirmPassword: "${confirmPassword}"
                        }) {
                            _id
                            token
                            email
                        }
                    }
                `
            };

            const { data } = await axios.post(
                'http://localhost:5000/graphql',
                requestBody
            );

            if (data.errors) {
                setError(data.errors[0].message)
                setLoading(false);
                console.error('There was an error.', data.errors[0].message)
            } else {
                setError(null);
                setLoading(false);

                const { _id, token } = await data.data.createUser;

                // Set authorized user in redux store, store token
                // in localStorage in browser and redirect user to
                // home page.

                setAuthenticatedUser(_id, email);
                localStorage.setItem('GRAPHQL_APP_TOKEN', token)
                history.push(routes.HOME);
            }
        } catch(error) {
            setError(error);
            setLoading(false);
            console.error('There was an error.', error);
        }
    }

    // Render component.

    return (
        <div>
            <h1>Sign Up Page</h1>
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
                    <input
                        className="form-input"
                        type="password"
                        placeholder="Confirm password"
                        onChange={handleChange(setConfirmPassword)}
                    />
                    <div>
                        <span style={{ color: "red" }}>{ error || ''}</span>
                    </div>
                    <input
                        className="form-submit"
                        type="submit"
                        value={loading ? "Verifying..." : "Register"}
                    />
                </form>
            </div>
        </div>
    )
 }

const mapDispatchToProps = (dispatch) => ({
    setAuthenticatedUser: (_id, email) => dispatch(
        setAuthenticatedUser(_id, email)
    )
})

export default withRouter(connect(null, mapDispatchToProps)(SignUp));