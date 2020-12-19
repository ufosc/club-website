import React from 'react';

const Footer = () => {
	return (
		<div className="footer">

			{/* The Links */}
			<a className="footer-link" target='_blank' rel="noopener noreferrer" href="https://discord.gg/Gsxej6u">
				<i className="fab fa-discord fa-2x"/>
			</a>
			<a className="footer-link" target='_blank' rel="noopener noreferrer" href="https://github.com/ufosc/">
				<i className="fab fa-github-square fa-2x"/>
			</a>
			<a className="footer-link" target='_blank' rel="noopener noreferrer" href="https://www.facebook.com/groups/ufosc/">
				<i className="fab fa-facebook-square fa-2x"/>
			</a>
			<a className="footer-link" target='_blank' rel="noopener noreferrer" href="mailto:gator.osc@gmail.com">
				<i className="fas fa-envelope-square fa-2x"/>
			</a>

			{/* The text */}
			<p className="footer-text">
				<i className="fas fa-code"/>
				with
				<i className="fas fa-heart"/>
				by <strong>OSC</strong>
			</p>

		</div>
	)
}

export default Footer;
