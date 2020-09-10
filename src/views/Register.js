import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
	return (
		<div>
			<form>
				<input type="email" placeholder="email" />
				<input type="password" placeholder="password" />
				<input type="password" placeholder="password again" />
				<button>Sign Up</button>
			</form>
			<Link to="/login">Already have an account?</Link>
		</div>
	)
}

export default Register;
