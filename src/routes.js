import React, {useState} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {ChakraProvider, Theme} from "@chakra-ui/react";

import PrivateRoute from "./components/PrivateRoute";
import Header from './components/Header';
import About from './views/About';
import NotFound from './views/NotFound';
import Home from './views/Home';
import Projects from './views/Projects';
import Dashboard from './views/Dashboard';
import Footer from './components/Footer';
import Login from './views/Login';
import Register from './views/Register'
import {AuthContext} from "./context/auth"

const Routes = () => {
	const existingTokens = JSON.parse(localStorage.getItem("tokens"));
	const [authTokens, setAuthTokens] = useState(existingTokens);

	const setTokens = (data) => {
		localStorage.setItem("tokens", JSON.stringify(data));
		setAuthTokens(data);
	}

	return (
		<AuthContext.Provider value={{authTokens, setAuthTokens: setTokens}}>
			<ChakraProvider >
				<Header/>
				<Switch>
					<Route exact path="/Home" component={Home}/>
					<Route exact path="/">
						<Redirect to="/Home"/>
					</Route>
					<Route exact path="/About" component={About}/>
					<Route exact path="/Projects" component={Projects}/>
					<Route path="/login" component={Login}/>
					<Route path="/signup" component={Register}/>
					<PrivateRoute path="/dashboard" component={Dashboard}/>
					<Route component={NotFound}/>
				</Switch>
				<Footer/>
			</ChakraProvider>
		</AuthContext.Provider>
	)
}

export default Routes;
