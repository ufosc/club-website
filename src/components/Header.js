import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/index.scss';

const Header = (props) => {

	return (
		<div className='topnav'>
			{/* Logo */}
			<Link id="logo-link" to="/">
				<img className="topnav-logo" src={ "/images/small-logo.png" } alt="Open Source Club Logo" />
			</Link>

			{/* Page Links */}
			<div className="topnav-right">
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
				<Link className="topnav-link" to="/login">Login</Link>
				<Link className="topnav-link" to="/signup">SignUp</Link>
			</div>
		</div>
	)
};

export default Header;
