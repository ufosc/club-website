import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';
import "../styles/index.scss";
import slides from "../config/slides";

class Slideshow extends Component {

	render() {
		return (
			<div className={"slide-container"}>
				<Carousel autoPlay={true} infiniteLoop={true} showStatus={false} showThumbs={false} interval={3000}
						  dynamicHeight={false} stopOnHover={true} swipeable={true}>
					{slides.map((slide, index) => (
						<div>
							<img src={slide.src}/>
							{
								slide.text !== "" ? <p className={"legend"}>{slide.text}</p> : <br/>
							}
						</div>
					))}
				</Carousel>
			</div>
		);
	}
}

export default Slideshow;
