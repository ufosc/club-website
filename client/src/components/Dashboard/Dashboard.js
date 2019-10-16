import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {logoutUser} from "../../actions/authActions";

class Dashboard extends Component {
	onLogoutClick = e => {
		e.preventDefault();
		this.props.logoutUser();
	};

	render() {
		const {user} = this.props.auth;
		return (
			<html>
			<head>
				<link rel="stylesheet"
					  href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"/>
				<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
			</head>
			<div style={{height: "75vh"}} className="container valign-wrapper">
				<div className="row">
					<div className="col s12 center-align">
						<h4>
							<b>Hey there,</b> {user.name.split(" ")[0]}
							<p className="flow-text grey-text text-darken-1">
								You are logged into the OSC website!
							</p>
						</h4>
						<button
							style={{
								width: "150px",
								borderRadius: "3px",
								letterSpacing: "1.5px",
								marginTop: "1rem"
							}}
							onClick={this.onLogoutClick}
							className="btn btn-large waves-effect waves-light hoverable blue accent-3"
						>
							Logout
						</button>
					</div>
				</div>
			</div>
			</html>
		);
	}
}

Dashboard.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
	auth: state.auth
});
export default connect(
	mapStateToProps,
	{logoutUser}
)(Dashboard);
