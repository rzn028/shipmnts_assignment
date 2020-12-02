import React, { useState, useContext } from 'react';
import { Form, Input, Button, Checkbox, Row, Card, notification, Tabs } from 'antd';
import axios from '../api/Handler';
import { endpoints } from '../constants/endpoints';


const layout = {
	labelCol: { span: 6 },
	wrapperCol: { span: 18 }
};

const tailLayout = {
	wrapperCol: { offset: 6, span: 18 }
};

const RegisterFrom = () => {
	const [ isLoading, setIsLoading ] = useState(false);
    const [ registerUserForm ] = Form.useForm();
	const onFinish = (values) => {
        setIsLoading(true);
        const data = {
            user_name: values.username,
            email: values.email,
            password: values.password
        }
		axios
			.post(endpoints.register, data)
			.then((res) => {
				notification.success({
					message: 'Success',
					description: 'Successfully registered. Please login',
					duration: 3
                });
                registerUserForm.resetFields();
			})
			.catch((err) => {
                console.log(err.response.data);
				notification.error({
					message: 'Error',
					description: err.response ? err.response.data.message : 'Something went wrong',
					duration: 3
				});
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const onFinishFailed = (errorInfo) => {
		// console.log('Failed:', errorInfo);
	};

	return (
		<Card>
			<Form
                {...layout}
                form={registerUserForm}
				name="basic"
				initialValues={{ remember: true }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
			>
				<Form.Item
					label="Username"
					name="username"
					rules={[ { required: true, message: 'Please input your username!' } ]}
				>
					<Input />
				</Form.Item>
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

				<Form.Item {...tailLayout}>
					<Button type="primary" htmlType="submit" disabled={isLoading}>
						Register
					</Button>
				</Form.Item>
			</Form>
		</Card>
	);
};

export default RegisterFrom;
