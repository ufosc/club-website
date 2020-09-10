import React from 'react';
import { Link } from 'react-router-dom';


const Login = () => {
	return (
		<div>
			<form>
				<input type="email" placeholder="email" />
				<input type="password" placeholder="password" />
				<button>Sign In</button>
			</form>
			<Link to="/signup">Don't have an account?</Link>
		</div>
	)
}

export default Login;
