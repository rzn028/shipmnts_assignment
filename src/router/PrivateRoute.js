import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export const PrivateRoute = ({ token, component: Component, ...rest }) => (
	<Route {...rest} component={(props) => (token ? <Component {...props} {...rest} /> : <Redirect to="/login" />)} />
);

export default PrivateRoute;
