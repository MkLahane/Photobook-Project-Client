import React, { Component, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const AuthRoute = ({ component: Component, inverse, ...rest }) => {
    const { user } = useContext(AuthContext);
    if (inverse) {
        return (
            <Route
                {...rest}
                render={props =>
                    user ? <Component {...props} /> : <Redirect to='/login' />
                } />
        );
    } else {
        return (
            <Route
                {...rest}
                render={props =>
                    user ? <Redirect to='/' /> : <Component {...props} />
                } />
        );
    }
};

export default AuthRoute; 