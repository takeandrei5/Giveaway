import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import { Center, Image } from '@chakra-ui/react';
import { useMemo } from 'react';
import { GrNext, GrPrevious } from 'react-icons/gr';
import Slider, { CustomArrowProps } from 'react-slick';

import { ImageSliderProps } from './types';

const ImageSlider = ({ images }: ImageSliderProps): JSX.Element => {
	const renderImages = useMemo(
		(): JSX.Element[] =>
			images.map(
				(image: string): JSX.Element => (
					<Image key={image} draggable={false} boxSize='25.625rem' objectFit='contain' src={image} alt='image' />
				)
			),
		[images]
	);

	const PreviousArrow = ({ currentSlide, slideCount, ...props }: CustomArrowProps): JSX.Element => (
		<GrPrevious className='slick-prev slick-arrow' {...props} />
	);

	const NextArrow = ({ currentSlide, slideCount, ...props }: CustomArrowProps): JSX.Element => (
		<GrNext className='slick-next slick-arrow' {...props} />
	);

	return (
		<Center
			borderRadius='2xl'
			bgColor='white'
			padding='1.5rem 8rem'
			height='31.25rem'
			marginTop='1rem'
			__css={{ '& > div.slick-slider.slick-initialized': { width: '100%', height: '90%' } }}>
			<Slider
				adaptiveHeight
				infinite
				dots
				lazyLoad='progressive'
				prevArrow={<PreviousArrow />}
				nextArrow={<NextArrow />}>
				{renderImages}
			</Slider>
		</Center>
	);
};

export default ImageSlider;
