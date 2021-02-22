import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "../context/auth";
import { postUser } from "../utils/requests";


const Login = () => {
	const [isLoggedIn, setLoggedIn] = useState(false);
	const [isError, setIsError] = useState(false);
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const { setAuthTokens } = useAuth();

	function handleLogin() {
		let body = {username: userName, password: password}
		postUser(body).then(response => {
			if (response.status === 200) {
				setAuthTokens(response.data);
				setLoggedIn(true);
				alert("Logged in")
			} else {
				setIsError(true);
				alert("Was an error")
			}
		}).catch(e => {
			setIsError(true);
		})
	}

	return (
		<div>
			<form>
				<input type="username" value={userName} onChange={e => {
					setUserName(e.target.value);
				}} placeholder="email" />
				<input type="password" value={password} onChange={e=> {
					setPassword(e.target.value);
				}} placeholder="password" />
				<button onClick={handleLogin} >Sign In</button>
			</form>
			<Link to="/signup">Don't have an account?</Link>
			{ isError &&<div>The username or password provided were incorrect!</div> }
		</div>
	)
}

export default Login;
