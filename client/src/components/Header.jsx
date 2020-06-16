import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import '../styles/index.scss';
import {loginUser} from "../actions/authActions";

const Header = (props) => {
	const [loggedIn, setLoggedIn] = useState("");

	useEffect(()=> {
		props.auth.isAuthenticated ? setLoggedIn("Profile") :  setLoggedIn("Sign In")
	}, [props]);

	return (
		<div className='topnav'>
			{/* Logo */}
			<Link id="logo-link" to="/">
				<img className="topnav-logo" src={ "/images/small-logo.png" } alt="Open Source Club Logo" />
			</Link>

			{/* Page Links */}
			<div className="topnav-right">
				<Link className="topnav-link" to='/Register'>{loggedIn}</Link>
				<Link className="topnav-link" to='/projects'>Projects</Link>
				<a className="topnav-link" target='_blank' rel="noopener noreferrer" href="https://www.facebook.com/groups/ufosc/events/?source=4&action_history=null&filter=calendar">
					Events
					<i className="fas fa-external-link-alt external-link" data-fa-transform="up-6"/>
				</a>
				<a className="topnav-link" target='_blank' rel="noopener noreferrer" href="https://github.com/ufosc/club-resources">
					Resources
					<i className="fas fa-external-link-alt external-link" data-fa-transform="up-6 right-4"/>
				</a>
				<Link className="topnav-link" to="/about">About</Link>
			</div>
		</div>
	)

};

Header.propTypes = {
	loginUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
});

export default connect(
	mapStateToProps,
	{loginUser}
)(Header);
