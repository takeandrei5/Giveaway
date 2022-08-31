import { Box, useColorModeValue } from '@chakra-ui/react';
import { GrNext, GrPrevious } from 'react-icons/gr';

import { ArrowProps } from './types';

const Arrow = ({ isNextArrow = false, ...rest }: ArrowProps): JSX.Element => {
	const lightOrDarkColor: 'light' | 'dark' = useColorModeValue('light', 'dark');

	return (
		<Box
			__css={{
				'& polyline': {
					stroke: `primary.${lightOrDarkColor}`,
				},
			}}>
			{isNextArrow ? (
				<GrNext className='slick-next slick-arrow' {...rest} style={{ width: '1.5rem', height: '1.5rem' }} />
			) : (
				<GrPrevious className='slick-prev slick-arrow' {...rest} style={{ width: '1.5rem', height: '1.5rem' }} />
			)}
		</Box>
	);
};

export default Arrow;
