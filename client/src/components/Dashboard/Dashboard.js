import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {logoutUser} from "../../actions/authActions";
import Dashprofile from "./Dashprofile.js";

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showPopup: false
		};
	}

	// sets the showPopup state to not the current value
	togglePopup = e => {
		this.setState({
			showPopup: !this.state.showPopup
		});
	};

	onLogoutClick = e => {
		e.preventDefault();
		this.props.logoutUser();
	};

	render() {
		const {user} = this.props.auth;
		return (
			<div>

				{/* Style links */}
				<link rel="stylesheet"
					  href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"/>
				<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>

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
								onClick={this.togglePopup}
								className="btn btn-small waves-effect waves-light hoverable blue accent-3">
								Edit Profile
							</button>
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

							{!this.state.showPopup ?
								<Dashprofile
									text='Click "Close Button" to hide popup'
									closePopup={this.togglePopup}
									user={user}
								/>
								: null
							}
						</div>
					</div>
				</div>
			</div>
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
