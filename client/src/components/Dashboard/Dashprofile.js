import React from 'react';
import './Dashboard.css';

// Declaration of the component as React Class Component
class Dashprofile extends React.Component {

	// Init of the component before it is mounted.
	constructor(props) {
		super(props);

		this.handleKeyUp = this.handleKeyUp.bind(this);
		this.handleOutsideClick = this.handleOutsideClick.bind(this);
	}

	// Add listeners immediately after the component is mounted.
	componentDidMount() {
		window.addEventListener('keyup', this.handleKeyUp, false);
		document.addEventListener('click', this.handleOutsideClick, false);
	}

	// Remove listeners immediately before a component is unmounted and destroyed.
	componentWillUnmount() {
		window.removeEventListener('keyup', this.handleKeyUp, false);
		document.removeEventListener('click', this.handleOutsideClick, false);
	}

	// Handle the key press event.
	handleKeyUp(e) {
		const {closePopup} = this.props;
		const keys = {
			27: () => {
				e.preventDefault();
				closePopup();
				window.removeEventListener('keyup', this.handleKeyUp, false);
			},
		};

		if (keys[e.keyCode]) {
			keys[e.keyCode]();
		}
	}

	// Handle the mouse click on browser window.
	handleOutsideClick(e) {
		const {closePopup} = this.props;

		if (!(this.modal == null)) {
			if (!this.modal.contains(e.target)) {
				closePopup();
				document.removeEventListener('click', this.handleOutsideClick, false);
			}
		}
	}

	// Render the component passing closePopup and user as props.
	render() {
		const {
			closePopup,
			user
		} = this.props;

		return (
			<div className="popup">
				<div
					className="popup_inner"
					ref={node => (this.modal = node)}
				>
					<button
						type="button"
						onClick={closePopup}
					>Close Me
					</button>
				</div>


			</div>
		);
	}
}

// Export the component to use it in other components.
export default Dashprofile;
