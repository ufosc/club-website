import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import {
	GET_ERRORS,
	SET_CURRENT_USER,
	USER_LOADING
} from "./types";

// register user
export const registerUser = (userData, history) => dispatch => {
	axios.post("/api/users/register", userData).then(res => history.push("/login"))
		.catch(err => dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		}));
};

// login, get user tkn
export const loginUser = userData => dispatch => {
	axios.post("/api/users/login", userData)
		.then(res => {
			// save tkn locally
			const {token} = res.data;
			localStorage.setItem("jwtToken", token);
			// set token to auth header
			setAuthToken(token);
			// decode token to get user
			const decoded = jwt_decode(token);
			// set current user
			dispatch(setCurrentUser(decoded));
		});
};

// set current logged in user
export const setCurrentUser = decoded => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded
	};
};

// user loading
export const setUserLoading = () => {
	return {
		type: USER_LOADING
	};
};

// log out user
export const logoutUser = () => dispatch => {
	// remove token from local storage
	localStorage.removeItem("jwtToken");
	// remove auth header for future requests
	setAuthToken(false);
	// set current user to empty obj to set isAuthenticated to false
	dispatch(setCurrentUser({}))
};
