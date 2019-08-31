import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';
import "../styles/index.scss";
import slides from "../config/slides";

class Slideshow extends Component {

	constructor(props) {
		super(props);
		// init state
		this.state = {
			legend: ""
		};
	}

	render() {
		return (
			<div className={"app"}>
				<Carousel className="carousel-wrapper" autoPlay={true} infiniteLoop={true} showStatus={false}
						  showThumbs={false} interval={6000}
						  dynamicHeight={false} stopOnHover={true} swipeable={true}>
					{slides.map((slide, index) => (
						<div>
							<img src={slide.src} className="slide"/>
						</div>
						))}
				</Carousel>
				<p>{"text"}</p> {/*Style this and update states on a timer.*/}
			</div>
		);
	}
}

export default Slideshow;
