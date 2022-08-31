import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import { Center } from '@chakra-ui/react';
import { Image } from '@components';
import { useMemo } from 'react';
import Slider from 'react-slick';

import { Arrow } from './Arrow';
import { ImageSliderProps } from './types';

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
			boxShadow='base'
			borderRadius='2xl'
			bgColor='white'
			padding='1.5rem 6rem'
			height='31.25rem'
			marginTop='1rem'
			__css={{
				'& > div.slick-slider.slick-initialized': { width: '100%', height: '90%' },
				// '& div.slick-slide.slick-active.slick-current div div': { boxShadow: 'none' },
			}}>
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
