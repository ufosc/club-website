import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {clientId} from "./cKeys";

import {
	GET_ERRORS,
	SET_CURRENT_USER,
	USER_LOADING
} from "../actions/types";



class SignIn extends React.Component {
 

	constructor(){
	super();

	this.state = {Authenticated: false, googleUser: null, jwtToken: '', redirect: false};
	}
		
	logout =()=>{
		this.setState({Authenticated: false, googleUser: null, jwtToken: '', redirect: false})
	};

    failure = (error) => {
        alert(error);
    };
	
	
	cRedirect = () =>{
	if(this.state.redirect) {
	return <Redirect to="/Home"/>
         }
      }

	responseGoogle = (response) => {
		console.log(response);
		const blob1 = new Blob([JSON.stringify({access_token: response.accessToken}, null, 2)],
				       {type: 'application/json'});
		const options ={
			method: 'POST',
			body: blob1,
			mode: 'cors',
			cache: 'default'
		};
		fetch('/api/users/auth/google', options)
			.then(r => {
				const jwtToken = r.headers.get('x-auth-token');
				r.json().then(googleUser=> {
					if(jwtToken){
						this.setState({Authenticated: true, googleUser, jwtToken, redirect: true})
						
			                        localStorage.setItem("jwtToken", jwtToken);
			                       // set token to auth header
			                       setAuthToken(jwtToken);
			                       // decode token to get user
			                       const decoded = jwt_decode(jwtToken);
			                       // set current user
			                       dispatch(setCurrentUser(decoded));
						
					}
				});
		        })
	};					

	
	render() {
		let content = !!this.state.Authenticated ?
		(	<div>
			{this.cRedirect()}
			</div>
		) :
		(
			<div>
			<GoogleLogin
					clientId={clientId}
					buttonText="Login"
					onSuccess={this.responseGoogle}
					onFailure={this.failure}
					cookiePolicy={'single_host_origin'}
				/>
			</div>
		);
		
		return (
		
			<div>
			{content}
			</div>
			

		);

	}
}

export default SignIn;

