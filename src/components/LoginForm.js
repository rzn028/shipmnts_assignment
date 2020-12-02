import React, { useState, useEffect, useContext } from 'react';
import { Form, Input, Button, Checkbox, Row, Card, notification, Tabs } from 'antd';
import Cookies from 'universal-cookie';
import axios from '../api/Handler';
import { AppContext } from '../context/AppContext';
import { endpoints } from '../constants/endpoints';

const layout = {
	labelCol: { span: 6 },
	wrapperCol: { span: 18 }
};

const tailLayout = {
	wrapperCol: { offset: 6, span: 18 }
};

const LoginForm = () => {

    const { setToken } = useContext(AppContext);
    const [ isLoggingIn, setIsloggingIn ] = useState(false);

	const onFinish = (values) => {
        setIsloggingIn(true);
        const data = {
            'email': values.email,
            'password': values.password
        }
		axios
			.post(endpoints.login, data)
			.then((res) => {
				notification.success({
					message: 'Success',
					description: 'Login successful',
					duration: 3
                });
                const token = res.data.token;
				const cookies = new Cookies();
				cookies.set('_sa_token', token, { path: '/' });
				setToken(token);
			})
			.catch((err) => {
                console.log(err);
				notification.error({
					message: 'Error',
					description: err.response ? err.response.data.message : 'Something went wrong',
					duration: 3
				});
			})
			.finally(() => {
				setIsloggingIn(false);
			});
	};

	const onFinishFailed = (errorInfo) => {
		// console.log('Failed:', errorInfo);
	};

    return (
        <Card>
        <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="Email"
                name="email"
                rules={[ { required: true, message: 'Please input your email!', type: 'email' } ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[ { required: true, message: 'Please input your password!' } ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit" disabled={isLoggingIn}>
                    Login
                </Button>
            </Form.Item>
        </Form>
    </Card>
    );
}


export default LoginForm;