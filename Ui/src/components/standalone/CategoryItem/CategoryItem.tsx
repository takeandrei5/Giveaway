import { Box, Image, Stack } from '@chakra-ui/react';

import { Typography } from '../../shared';
import { CategoryItemI } from './interfaces';

const CategoryItem = ({
	image,
	name,
	onClick,
	active = false,
	containerBgColor = 'transparent',
}: CategoryItemI): JSX.Element => (
	<Box
		_hover={{
			cursor: 'pointer',
			filter: active ? 'brightness(60%)' : 'brightness(90%)',
			'& p': { filter: active ? 'opacity(0.6)' : 'opacity(0.9)' },
		}}
		_active={{ filter: 'brightness(80%)', '& p': { filter: 'opacity(0.8)' } }}
		bgColor={containerBgColor}
		onClick={onClick}
		padding='0.5rem'
		maxWidth='7.5rem'
		filter={active ? 'brightness(70%)' : 'auto'}
		__css={{
			'& p': {
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
