import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import Header from './components/Header/Header';
import NotFound from './views/NotFound';
import Home from './views/Home';
import Footer from './components/Footer'

// This exports the different routes that will be used on the page
export const Routes = () => {
	return (
		<div>
			<Header />
			<Switch>
				<Route exact path="/Home" component={Home}/>
				<Route exact path="/">
					<Redirect to="/Home"/>
				</Route>
				<Route component={NotFound}/>
			</Switch>
			<Footer />
		</div>
	)
}
