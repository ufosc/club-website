import React from 'react';
import config from './config.json';
import {GoogleLogin} from 'react-google-login';




class SignIn extends React.Component {
	constructor(){
	super();
	this.state = {Authenticated: false, googleUser: null,jwtToken: '';
	}
	}
		
	logout =()=>{
		this.setState({Authenticated: false, googleUser: null,jwtToken: '';
	})
	};

	const responseGoogle = (response) => {
		console.log(response);
		const blob1 = new Blob([JSON.stringify({access_token: response.accessToken}, null, 2)],
				       {type: 'application/json'});
		const options ={
			method: 'POST'
			body: blob1,
			mode: 'cors'
			cache: 'default'
		};
		axios('http://localhost:4000/api/v1/auth/google', options)
			.then(r => {
				const token = r.headers.get('x-auth-token');
				r.json().then(user=> {
					if(token){
						this.setState({Authenticated: true, googleUser, jwtToken})
					}
				});
		        })
	};					

	}
	render() {

		return (
			
				<GoogleLogin
					clientId=secrets.google_oAuth;
					buttonText="Login"
					onSuccess={this.responseGoogle}
					onFailure={this.responseGoogle}
					cookiePolicy={'single_host_origin'}
				/>
			

		)

	}
}

export default SignIn;
