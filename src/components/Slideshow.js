import React, { useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import '../styles/index.scss';
import slides from '../config/slides';
import { Box, VStack, Text } from '@chakra-ui/react';

const Slideshow = () => {
	const [slideIndex, setSlideIndex] = useState(0);

	const onChangeCarouselIndex = index => {
		if (slideIndex !== index) {
			setSlideIndex(index);
			updateLegend();
		}
	};

	const updateLegend = () => {
		if (slideIndex === 0)
			return (
				<p>
					<br />
				</p>
			);
		return <Text>{slides[slideIndex].text}</Text>;
	};

	return (
		<VStack>
			<Carousel
				className="carousel-wrapper"
				autoPlay={true}
				infiniteLoop={true}
				showStatus={false}
				showThumbs={false}
				interval={6000}
				selectedItem={slideIndex}
				dynamicHeight={false}
				stopOnHover={true}
				swipeable={true}
				onChange={onChangeCarouselIndex}
			>
				{slides.map((slide, index) => (
					<div>
						<img src={slide.src} className="slide" alt={slide.name} />
					</div>
				))}
			</Carousel>
			<Box>{updateLegend()}</Box>
		</VStack>
	);
};

export default Slideshow;
