import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/index.css';
import logo from './small-logo.png';

const Header = () => {
	return (
		<div className='topnav'>
			{/* Logo */}
			<Link id="logo-link" to="/">
				<img className="topnav-logo" src={ logo } alt="Open Source Club Logo" />
			</Link>

			{/* Page Links */}
			<div className="topnav-right">
				<Link className="topnav-link" to='/signin'>Sign in</Link>
				<Link className="topnav-link" to='/projects'>Projects</Link>
				<Link className="topnav-link"
				   to="https://www.facebook.com/groups/ufosc/events/?source=4&action_history=null&filter=calendar">
					Events
					<i className="fas fa-external-link-alt external-link" data-fa-transform="up-6"></i>
				</Link>
				<Link className="topnav-link" to="https://github.com/ufosc/club-resources">
					Resources
					<i className="fas fa-external-link-alt external-link" data-fa-transform="up-6 right-4"></i>
				</Link>
				<Link className="topnav-link" to="/about">About</Link>
			</div>
		</div>
	)
}

export default Header;
