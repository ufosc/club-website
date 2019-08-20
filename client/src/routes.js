import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import NotFound from './views/NotFound';
import Home from './views/Home';

// This exports the different routes that will be used on the page
export const Routes = () => {
	return (
		<div>
			<Switch>
				<Route exact path="/Home" component={Home}/>
				<Route exact path="/">
					<Redirect to="/Home"/>
				</Route>
				<Route component={NotFound}/>
			</Switch>
		</div>
	)
}
