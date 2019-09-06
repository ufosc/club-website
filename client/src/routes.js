import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import Header from './components/Header';
import About from './views/About';
import NotFound from './views/NotFound';
import Home from './views/Home';
import Projects from './views/Projects';
import Footer from './components/Footer'
import Register from './components/Auth/Register.jsx';
import Login from './components/Auth/Login.jsx';
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Dashboard from "./components/Dashboard/Dashboard.js";
import { Provider } from "react-redux";
import store from "./store";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
	// Set auth token header auth
	const token = localStorage.jwtToken;
	setAuthToken(token);
	// Decode token and get user info and exp
	const decoded = jwt_decode(token);
	// Set user and isAuthenticated
	store.dispatch(setCurrentUser(decoded));
// Check for expired token
	const currentTime = Date.now() / 1000; // to get in milliseconds
	if (decoded.exp < currentTime) {
		// Logout user
		store.dispatch(logoutUser());
		// Redirect to login
		window.location.href = "./login";
	}
}

// This exports the different routes that will be used on the page
export const Routes = () => {
	return (
		<div>
			<Provider store={store}>
				<Header/>
				<Switch>
					<Route exact path="/Home" component={Home}/>
					<Route exact path="/">
						<Redirect to="/Home"/>
					</Route>
					<Route exact path="/About" component={About}/>
					<Route exact path="/Projects" component={Projects}/>
					<Route exact path="/Register" component={Register}/>
					<Route exact path="/Login" component={Login}/>
					<Switch>
						<PrivateRoute exact path="/dashboard" component={Dashboard}/>
					</Switch>
					<Route component={NotFound}/>
				</Switch>
				<Footer/>
			</Provider>
		</div>
	)
}
