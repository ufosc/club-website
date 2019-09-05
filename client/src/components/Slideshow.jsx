import React, {Component} from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';
import "../styles/index.scss";
import slides from "../config/slides";

class Slideshow extends Component {

	constructor(props) {
		super(props);
		// init state
		this.state = {
			slideIndex: 0
		};
	}

	componentDidMount() {
		const {slideIndex} = this.state;
		this.onChange(slideIndex);
	};

	onChangeCarouselIndex = index => {
		const {slideIndex} = this.state;
		if (slideIndex !== index)
			this.onChange(index);
	};

	onChange = index => {
		this.setState({slideIndex: index});
		this.updateLegend();
	};

	updateLegend = () => {
		const {slideIndex} = this.state;
		if (slideIndex === 0)
			return <p><br/></p>;
		return <p>{slides[slideIndex].text}</p>
	};

	render() {
		const {slideIndex} = this.state;
		return (
			<div className={"app"}>
				<Carousel className="carousel-wrapper" autoPlay={true} infiniteLoop={true} showStatus={false}
						  showThumbs={false} interval={6000} selectedItem={slideIndex}
						  dynamicHeight={false} stopOnHover={true} swipeable={true}
						  onChange={this.onChangeCarouselIndex}>
					{slides.map((slide, index) => (
						<div>
							<img src={slide.src} className="slide"/>
						</div>
					))}

				</Carousel>
				<div>
					{this.updateLegend()}
				</div>
			</div>
		);
	}
}

export default Slideshow;
