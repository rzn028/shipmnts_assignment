import React, { useContext, useEffect, useState } from 'react';
import { Layout, Row, Col, Typography, Button, Card, Empty, Divider, Descriptions } from 'antd';
import axios from './api/Handler';
import { AppContext } from './context/AppContext';
import { endpoints } from './constants/endpoints';

const { Title } = Typography;

const App = () => {
	const { expenses, setShowAddExpenseModal, setShowAddCategoryModal, setExpenses } = useContext(AppContext);

	return (
		<Layout className="main" style={{ minHeight: '100vh' }}>
			<Row style={{ height: '100%', marginTop: '70px' }} align="center">
				<Col span={14} md={14} xs={24} sm={24}>
					<Title style={{ color: '#757575' }}>Expenses</Title>
					<Button
						type="primary"
						onClick={() => {
							setShowAddExpenseModal(true);
						}}
						style={{marginRight: '20px'}}
					>
						Add expense
					</Button>
					<Button
						onClick={() => {
							setShowAddCategoryModal(true);
						}}
					>
						Add category
					</Button>
					<Divider />
					{!expenses.length && <Empty description={'No expenses to show'} style={{ marginTop: '8rem' }} />}
					{expenses.map((item, index) => {
						return (
							<Descriptions title="Expense Info" key={index} style={{borderRadius: '10px' , padding: '1rem', background: '#ffffff', boxShadow: '0px 0px 8px #aeaeae', margin: '25px 0px'}}>
								<Descriptions.Item label="Category">{item.category}</Descriptions.Item>
								<Descriptions.Item label="Amount">{item.amount}</Descriptions.Item>
								<Descriptions.Item label="Created at">{item.date_added}</Descriptions.Item>
								<Descriptions.Item label="Description">{item.description}</Descriptions.Item>
							</Descriptions>
						);
					})}
				</Col>
			</Row>
		</Layout>
	);
};

export default App;
