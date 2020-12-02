import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Checkbox, Row, Card, notification, Tabs } from 'antd';
import Cookies from 'universal-cookie';
import axios from '../api/Handler';

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const { TabPane } = Tabs;
const callback = (key) => {
	console.log(key);
}

const Login = () => {

	useEffect(() => {
		document.title = 'Shipmnts | Login';
	}, []);

	return (
		<Row type="flex" style={{ height: '100vh', width: '100%', backgroundColor: '#ececec' }}>
			<Row type="flex" justify="center" align="middle" style={{ height: '100%', width: '100%' }}>
				<Tabs defaultActiveKey="1" onChange={callback}>
					<TabPane tab="Login" key="1">
						<LoginForm />
					</TabPane>
					<TabPane tab="Register" key="2">
						<RegisterForm />
					</TabPane>
				</Tabs>
			</Row>
		</Row>
	);
};

export default Login;
