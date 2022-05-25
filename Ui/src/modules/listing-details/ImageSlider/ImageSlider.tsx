import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import { Center } from '@chakra-ui/react';
import { useMemo } from 'react';
import { GrNext, GrPrevious } from 'react-icons/gr';
import Slider, { CustomArrowProps } from 'react-slick';

import { ImageSliderProps } from './types';
import { Image } from '@components';
import { Arrow } from './Arrow';

const ImageSlider = ({ images }: ImageSliderProps): JSX.Element => {
	const renderImages = useMemo(
		(): JSX.Element[] =>
			images.map(
				(image: string): JSX.Element => (
					<Image key={image} height='25.625rem' width='100%' objectFit='contain' src={image} alt='image' />
				)
			),
		[images]
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
				prevArrow={<Arrow />}
				nextArrow={<Arrow isNextArrow />}>
				{renderImages}
			</Slider>
		</Center>
	);
};

export default ImageSlider;
