import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import App from '../App';
import Cookies from 'universal-cookie';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Login from '../components/Login';
import NotFoundPage from '../components/NotFoundPage';
import LoadingPage from '../components/LoadingPage';
import Header from '../components/Header';
import { AppContext } from '../context/AppContext';
import Categories from '../components/Categories';
import AddExpenseModal from '../modals/AddExpense';
import AddCategoryModal from '../modals/AddCategory';
import axios from '../api/Handler';
import { endpoints } from '../constants/endpoints';



const cookies = new Cookies();

const AppRouter = () => {
	const [ token, setToken ] = useState();
	const [ isTokenLoaded, setIsTokenLoaded ] = useState(false);
	const [ categories, setCategories ] = useState([]);
	const [ expenses, setExpenses ] = useState([]);
	const [ fromdate, setFromdate ] = useState();
	const [ toDate, setToDate ] = useState();
	const [ showAddExpenseModal, setShowAddExpenseModal ] = useState(false);
	const [ showAddCategoryModal, setShowAddCategoryModal ] = useState(false);

	const loadToken = async () => {
		const token = await cookies.get('_sa_token');
		if (token) {
			setToken(token);
		}
		setIsTokenLoaded(true);
	};

	const getCategories = () => {
		axios
		.get(endpoints.categories)
		.then((res) => {
			console.log(res.data);
			setCategories(res.data.categories);
		})
		.catch((err) => {
			console.log(err);
		})
		.finally(() => {
		});
	};

	const getExpenses = (category=null) => {
		console.log("called expense");
		const url = category ? `${endpoints.expenseDetails}/${category}` : endpoints.expenseDetails;
		axios
		.post(url)
		.then((res) => {
			setExpenses([...res.data]);
		})
		.catch((err) => {
			console.log(err);
		})
		.finally(() => {
			console.log("finally");
		});
	};

	useEffect(() => {
		loadToken();
	}, []);

	useEffect(() => {
		if (token) {
			getCategories();
			getExpenses();
		}
	}, [token]);

	if (!isTokenLoaded) {
		return <LoadingPage />;
	}

	if (isTokenLoaded) {
		return (
			<Router>
				<AppContext.Provider value={{
					token,
					setToken,
					expenses,
					setExpenses,
					categories,
					setCategories,
					getCategories,
					showAddCategoryModal,
					showAddExpenseModal,
					setShowAddCategoryModal,
					setShowAddExpenseModal,
					getExpenses
				}}>
					<Header/>
					<Switch>
						<PrivateRoute path="/" exact={true} token={token} setToken={setToken} component={App} />
						<PrivateRoute path="/categories" exact={true} token={token} setToken={setToken} component={Categories} />
						<PublicRoute path="/login" token={token} setToken={setToken} component={Login} />
						<Route component={NotFoundPage} />
					</Switch>
					<AddExpenseModal/>
					<AddCategoryModal/>
				</AppContext.Provider>
			</Router>
		);
	}
};

export default AppRouter;
