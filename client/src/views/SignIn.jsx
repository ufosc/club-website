import React from 'react';
import GoogleLogin from 'react-google-login';


const responseGoogle = (response) => {
	console.log(response);

}
axios.post(`https://ufopensource.club/users`, { responseGoogle })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })

module.exports = {
  token: response.Zi.id_token;
};

class SignIn extends React.Component {
	render() {
		return (
			
				<GoogleLogin
clientId=secrets.google_oAuth;
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
