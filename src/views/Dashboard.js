import React from 'react';
import { useAuth } from "../context/auth";

const Dashboard = () => {
	const { setAuthTokens } = useAuth();

	function logOut() {
		setAuthTokens();
	}

	return (
		<div>
			This is a protected user page
			<button onClick={logOut}>Log out</button>
		</div>
	)
}

export default Dashboard;
