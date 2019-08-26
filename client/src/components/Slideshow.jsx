import React from "react";
import styles from "../styles/index.css";

class Slide extends React.Component {
	render() {
		return <img src={this.props.info.source}/>
	}
}

class SlideContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			slideInfos: props.slideInfos,
			currentSlide: 0
		}
	}

	render() {
		return (
			<html>
			{/* Slideshow  */}
			<div id="slideshow" className="page-element" style={{"padding": "0px"}}>
				<div className="slideshow-container">
					<div className="slideContainer fade">
						<img className="slide" style={{"object-fit": "contain", "background-color": "#262626"}}
							 src="../images/logo-text.png"/>
						<br/>
						{/*  This is here so the box is the same height as the other slides w/text */}
					</div>
					<div className="slideContainer fade">
						<img className="slide" style={{"object-position": "50% 35%"}}
							 src="../images/casual-coding.jpg"/>
						<div className="text">Casual Coding</div>
					</div>
					<div className="slideContainer fade">
						<img className="slide" style={{"object-position": "50% 25%"}}
							 src="../images/swamp-hacks-2017.jpg"/>
						<div className="text">Hackathons</div>
					</div>
					<div className="slideContainer fade">
						<img className="slide" style={{"object-position": "50% 30%"}} src="../images/lan-party.jpg"/>
						<div className="text">LAN parties</div>
					</div>
					<div className="slideContainer fade">
						<img className="slide" src="../images/mozilla-talk.jpg"/>
						<div className="text">Guest Speakers</div>
					</div>
					<a className="prev arrow" onClick={this.setSlideActive(this.slideIndex - 1)}>&#10094;</a>
					<a className="next arrow" onClick={this.setSlideActive(this.slideIndex + 1)}>&#10095;</a>
				</div>
				<div style={{"text-align": "center", "padding-bottom": "10px"}}>
					<span className="dot" onClick={this.setSlideActive(0)}/>
					<span className="dot" onClick={this.setSlideActive(1)}/>
					<span className="dot" onClick={this.setSlideActive(2)}/>
					<span className="dot" onClick={this.setSlideActive(3)}/>
					<span className="dot" onClick={this.setSlideActive(4)}/>
				</div>
			</div>
			</html>
		)
	}
}

export default SlideContainer;
