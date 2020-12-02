import React, { useState, useContext } from 'react';
import { Modal, Button, Form, Input, notification } from 'antd';
import { AppContext } from '../context/AppContext';
import axios from '../api/Handler';
import { endpoints } from '../constants/endpoints';

const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 }
};

const tailLayout = {
	wrapperCol: { offset: 8, span: 16 }
};

const AddCategoryModal = () => {
	const { showAddCategoryModal, setCategories, setShowAddCategoryModal } = useContext(AppContext);
	const [ addCategoryForm ] = Form.useForm();

	const handleOk = () => {
		setShowAddCategoryModal(false);
	};

	const handleCancel = () => {
        addCategoryForm.resetFields();
		setShowAddCategoryModal(false);
	};

	const addItemCategory = (values) => {
		const data = {
			name: values.categoryName
		};
		axios
			.post(endpoints.addCategory, data)
			.then((res) => {
				notification.success({
					message: 'Success',
					description: 'Category successfully added',
					duration: 3
				});
				setCategories((old) => [ ...old, values.categoryName ]);
				addCategoryForm.resetFields();
				setShowAddCategoryModal(false);
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
		<Modal title={'Add Category'} visible={showAddCategoryModal} onOk={handleOk} onCancel={handleCancel}>
			<Form {...layout} form={addCategoryForm} name="basic" onFinish={addItemCategory} onFinishFailed={null}>
				<Form.Item
					label="Category name"
					name="categoryName"
					rules={[ { required: true, message: 'Please input your category name!', type: 'string' } ]}
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

export default AddCategoryModal;
