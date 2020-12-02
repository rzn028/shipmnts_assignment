import React, { useContext } from 'react';
import { Row, Col } from 'antd';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { useLocation } from 'react-router-dom';

const Header = () => {
	let location = useLocation();
	const { token, setToken } = useContext(AppContext);
	const handleLogout = async () => {
		const cookies = new Cookies();
		cookies.remove('_sa_token');
		setToken(null);
	};

	return (
		<Row
			align="middle"
			style={{
				backgroundColor: '#383838',
				color: '#ffffff',
				minHeight: '70px',
				padding: '0px 10px',
				position: 'fixed',
				zIndex: 5,
				width: '100%'
			}}
			justify={'center'}
		>
			<Col span={16} md={16} xs={18} sm={18} justify={'center'}>
				<font style={{ fontSize: '28px', marginRight: '10px' }}>Shipmnts</font>
				<span style={{ fontWeight: 'bold', color: '#aeaeae' }}>Assignment</span>
			</Col>
			<Col span={8} xs={6} sm={6} md={8} style={{ padding: '5px' }} align="middle">
				{token && (
					<React.Fragment>
						<button
							onClick={handleLogout}
							style={{
								border: 'none',
								background: 'none',
								fontSize: '1.2rem',
								color: 'red',
								cursor: 'pointer',
								float: 'right'
							}}
						>
							Logout
						</button>
						{location.pathname.toLowerCase() === '/' && (
							<Link
								style={{
									border: 'none',
									background: 'none',
									fontSize: '1.2rem',
									color: '#57d5ff',
									cursor: 'pointer',
									float: 'right',
									marginRight: '2rem'
								}}
								to="/categories"
							>
								Categories
							</Link>
						)}
						{location.pathname.toLowerCase() === '/categories' && (
							<Link
								style={{
									border: 'none',
									background: 'none',
									fontSize: '1.2rem',
									color: '#57d5ff',
									cursor: 'pointer',
									float: 'right',
									marginRight: '2rem'
								}}
								to="/"
							>
								Expenses
							</Link>
						)}
					</React.Fragment>
				)}
			</Col>
		</Row>
	);
};

export default Header;
