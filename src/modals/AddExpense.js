import React, { useState, useContext } from 'react';
import { Modal, Button, Form, Typography, Select, Input, Divider, notification, InputNumber } from 'antd';
import { AppContext } from '../context/AppContext';
import axios from '../api/Handler';
import { endpoints } from '../constants/endpoints';

const { Text } = Typography;

const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 }
};

const tailLayout = {
	wrapperCol: { offset: 8, span: 16 }
};

const AddExpenseModal = () => {
	const {
		categories,
		showAddExpenseModal,
		setShowAddCategoryModal,
		setShowAddExpenseModal,
		setExpenses
	} = useContext(AppContext);
	const [ addExpenseForm ] = Form.useForm();

	const handleOk = () => {
		addExpenseForm.resetFields();
		setShowAddExpenseModal(false);
	};

	const handleCancel = () => {
		addExpenseForm.resetFields();
		setShowAddExpenseModal(false);
	};

	const addExpense = (values) => {
		const data = {
			category: values.categoryName,
			amount: values.amount,
			description: values.description
		};
		axios
			.post(endpoints.addExpense, data)
			.then((res) => {
				notification.success({
					message: 'Success',
					description: 'Expense successfully added',
					duration: 3
				});
				console.log(res.data);
				setExpenses((old) => [ ...old,  {...res.data.expense_resource}]);
				addExpenseForm.resetFields();
				setShowAddExpenseModal(false);
			})
			.catch((err) => {
				notification.error({
					message: 'Error',
					description: err.response ? err.response.data.message : 'Something went wrong',
					duration: 3
				});
			})
			.finally(() => {});
	};

	return (
		<Modal title={'Add Expense'} visible={showAddExpenseModal} onOk={handleOk} onCancel={handleCancel}>
			<Form {...layout} form={addExpenseForm} name="basic" onFinish={addExpense} onFinishFailed={''}>
				{!categories.length && (
					<React.Fragment>
						<Text type="primary">{'Hye! You don not have any categories. Please add one'}</Text>
						<br />
						<br />
						<Button
							onClick={() => {
								setShowAddExpenseModal(false);
								setShowAddCategoryModal(true);
							}}
						>
							Add a category
						</Button>
						<Divider />
					</React.Fragment>
				)}
				{!!categories.length && (
					<Form.Item
						label="Select category"
						name="categoryName"
						rules={[ { required: true, message: 'Please select a category!' } ]}
					>
						<Select>
							{categories.map((item) => {
								return <Select.Option value={item} key={item}>{item} </Select.Option>;
							})}
						</Select>
					</Form.Item>
				)}
				<Form.Item
					label="Amount"
					name="amount"
					rules={[ { required: true, message: 'Please input your expense amount!' } ]}
				>
					<InputNumber />
				</Form.Item>
				<Form.Item
					label="Description"
					name="description"
					rules={[ { required: true, message: 'Please input your expense amount!', type: 'string' } ]}
				>
					<Input />
				</Form.Item>

				<Form.Item {...tailLayout}>
					<Button type="primary" htmlType="submit">
						Submit
					</Button>
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default AddExpenseModal;
