import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useAuth } from "../context/auth";
import axios from "axios";

const Register = () => {
	const [isLoggedIn, setLoggedIn] = useState(false);
	const [isError, setIsError] = useState(false);
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const { setAuthTokens } = useAuth();

	function postSignup() {
		axios.post("http://localhost:4000/api/auth/register", {
			"username": userName,
			"password": password
		}).then(result => {
			if (result.status === 200) {
				setAuthTokens(result.data);
				setLoggedIn(true);
			} else {
				setIsError(true);
			}
		}).catch(e => {
			setIsError(true);
		});
	}

	if (isLoggedIn) {
		return <Redirect to="/dashboard" />;
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
				<button onClick={postSignup} >Sign Up</button>
				{ isError &&<div>There was a problem with the signup process!</div> }
			</form>
			<Link to="/login">Already have an account?</Link>
		</div>
	)
}

export default Register;
