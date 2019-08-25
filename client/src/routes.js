import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import Header from './components/Header';
import About from './views/About';
import NotFound from './views/NotFound';
import Home from './views/Home';
import Projects from './views/Projects';
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
				{/* <Route exact path="/About" component={About}/> */}
				<Route exact path="/Projects" component={Projects}/>
				<Route component={NotFound}/>
			</Switch>
			<Footer />
		</div>
	)
}
