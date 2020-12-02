import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Layout, Row, Col, Typography, Button, Card, Empty, Divider, Descriptions } from 'antd';

const { Title } = Typography;


const Categories = () => {
	const { categories, setShowAddCategoryModal, setShowAddExpenseModal } = useContext(AppContext);
	return (
		<Layout className="main" style={{ minHeight: '100vh' }}>
			<Row style={{ height: '100%', marginTop: '70px' }} align="center">
				<Col span={14} md={14} xs={24} sm={24}>
					<Title style={{ color: '#757575' }}>Categories</Title>
					<Button
						type="primary"
						onClick={() => {
							setShowAddExpenseModal(true);
						}}
						style={{ marginRight: '20px' }}
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
					{!categories.length && <Empty description={'No categories to show'} style={{ marginTop: '8rem' }} />}
					{categories.map((item, index) => {
						return (
							<Descriptions
								title="Category Info"
								key={index}
								style={{
									borderRadius: '10px',
									padding: '1rem',
									background: '#ffffff',
                                    boxShadow: '0px 0px 8px #aeaeae',
                                    margin: '20px 0px'
								}}
							>
								<Descriptions.Item label="Category">{item}</Descriptions.Item>
							</Descriptions>
						);
					})}
				</Col>
			</Row>
		</Layout>
	);
};

export default Categories;
