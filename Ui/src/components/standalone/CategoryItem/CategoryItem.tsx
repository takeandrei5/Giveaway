import { Box, Image, Stack } from '@chakra-ui/react';

import { Typography } from '../../shared';
import { CategoryItemProps } from './types';

const CategoryItem = ({
	image,
	name,
	onClick,
	active = false,
	containerBgColor = 'transparent',
}: CategoryItemProps): JSX.Element => (
	<Box
		_hover={{
			cursor: 'pointer',
			filter: active ? 'brightness(60%)' : 'brightness(90%)',
			'& span': { filter: active ? 'opacity(0.6)' : 'opacity(0.9)' },
		}}
		_active={{ filter: 'brightness(80%)', '& span': { filter: 'opacity(0.8)' } }}
		bgColor={containerBgColor}
		onClick={onClick}
		padding='0.5rem'
		maxWidth='7.5rem'
		filter={active ? 'brightness(70%)' : 'auto'}
		__css={{
			'& span': {
				filter: active ? 'opacity(0.7)' : 'auto',
			},
		}}>
		<Stack direction='column' alignItems='center' justifyContent='center'>
			<Image draggable={false} borderRadius='full' boxSize='6.25rem' objectFit='cover' src={image} alt={name} />
			<Typography center color={'darkish'} variant='h5'>
				{name}
			</Typography>
		</Stack>
	</Box>
);

export default CategoryItem;
