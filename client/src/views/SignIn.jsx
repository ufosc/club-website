import React from 'react';
import GoogleLogin from 'react-google-login';


const responseGoogle = (response) => {
	console.log(response);

}

module.exports = {
  token: response.Zi.id_token;
};

class SignIn extends React.Component {
	render() {
		return (
			
				<GoogleLogin
clientId="secret"
buttonText="Login"
onSuccess={responseGoogle}
onFailure={responseGoogle}
cookiePolicy={'single_host_origin'}
repsonseType ="code"
/>
			

		)

	}
}

export default SignIn;
