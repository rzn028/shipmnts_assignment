import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PublicRoute = ({ token, component: Component, ...rest }) => (
	<Route
		{...rest}
		component={(props) => {
			if (props.location.pathname === '/login' && token) {
				return <Redirect to="/" />;
			}
			return <Component {...props} {...rest} />;
		}}
	/>
);

export default PublicRoute;
