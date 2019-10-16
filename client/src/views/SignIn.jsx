import React from 'react';

const responseGoogle = (response) => {
	console.log(response);
}

class SignIn extends React.Component {
	render() {
		return (
			<div>
				<GoogleLogin
clientId="import secret"
buttonText="Login"
onSuccess={responseGoogle}
onFailure={responseGoogle}
cookiePolicy={'single_host_origin'}
/>
			</div>

		)

	}
}

export default SignIn;
