import React from 'react';

const Footer = () => {
	return (
		<div className="footer">

			{/* The Links */}
			<a className="footer-link" target='_blank' href="https://discord.gg/Gsxej6u">
				<i className="fab fa-discord fa-2x"></i>
			</a>
			<a className="footer-link" target='_blank' href="https://github.com/ufosc/">
				<i className="fab fa-github-square fa-2x"></i>
			</a>
			<a className="footer-link" target='_blank' href="https://www.facebook.com/groups/ufosc/">
				<i className="fab fa-facebook-square fa-2x"></i>
			</a>
			<a className="footer-link" target='_blank' href="mailto:gator.osc@gmail.com">
				<i className="fas fa-envelope-square fa-2x"></i>
			</a>

			{/* The text */}
			<p className="footer-text">
				<i className="fas fa-code"></i>
				with
				<i className="fas fa-heart"></i>
				by <strong>OSC</strong>
			</p>

		</div>
	)
}

export default Footer;
