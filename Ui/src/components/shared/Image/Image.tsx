import { Box } from '@chakra-ui/react';
import NextImage, { ImageLoader, ImageLoaderProps } from 'next/image';

import { ImageProps } from './types';

const Image = ({
	height,
	width,
	backgroundColor = 'transparent',
	borderRadius = 'none',
	draggable = false,
	...props
}: ImageProps) => {
	const Loader: ImageLoader = ({ src, width, quality, config }: ImageLoaderProps) => `${src}?q=${quality || 75}`;

	return (
		<Box
			backgroundColor={backgroundColor}
			borderRadius={borderRadius}
			height={height}
			width={width}
			overflow='hidden'
			__css={{ '& > span': { height: '100% !important' } }}>
			<NextImage {...props} draggable={draggable} layout='responsive' height='100%' width='100%' loader={Loader} />
		</Box>
	);
};
export default Image;
