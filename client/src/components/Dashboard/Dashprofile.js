import React from 'react';
import './Dashboard.css';

class Dashprofile extends React.Component {
	render() {
		return (
			<div className='popup'>
				<div className='popup\_inner'>
					<h1>{this.props.user.name}</h1>
					<button onClick={this.props.closePopup}>close me</button>
				</div>
			</div>
		);
	}
}

export default Dashprofile;
