import { Box } from '@chakra-ui/react';
import NextImage, { ImageLoader, ImageLoaderProps } from 'next/image';

import { ImageProps } from './types';

const Image = ({
	height = 'auto',
	width = 'auto',
	backgroundColor = 'transparent',
	borderRadius = 'none',
	borderColor = 'inherit',
	draggable = false,
	...props
}: ImageProps) => {
	// todo -> research more

	// const Loader: ImageLoader = ({ src, width, quality, ...rest }: ImageLoaderProps) => {
	// 	const params = [`width=${width}`];
	// 	if (quality) {
	// 		params.push(`quality=${quality}`);
	// 	}
	// 	const paramsString = params.join(',');

	// 	return `${src}/cdn-cgi/image/${paramsString}`;
	// };

	return (
		<Box
			backgroundColor={backgroundColor}
			borderRadius={borderRadius}
			boxShadow='base'
			position='relative'
			height={height}
			width={width}
			overflow='hidden'
			__css={{
				'& > span': {
					height: '100% !important',
					border: `0.0625rem solid ${borderColor} !important`,
					borderRadius,
				},
			}}>
			<NextImage {...props} draggable={draggable} layout='responsive' height='100%' width='100%' />
		</Box>
	);
};
export default Image;
