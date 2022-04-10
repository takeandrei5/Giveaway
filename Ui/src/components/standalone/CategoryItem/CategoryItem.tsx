import { Box, Image, Stack, useColorModeValue } from '@chakra-ui/react';

import { Typography } from '../../shared';
import { CategoryItemI } from './interfaces';

const CategoryItem = ({
	image,
	title,
	onClick,
	containerBgColor = 'transparent',
}: CategoryItemI): JSX.Element => {
	return (
		<Box
			_hover={{
				cursor: 'pointer',
				filter: 'brightness(95%)',
				'& p': { filter: 'opacity(0.95)' },
			}}
			_active={{ filter: 'brightness(90%)', '& p': { filter: 'opacity(0.9)' } }}
			bgColor={containerBgColor}
			onClick={onClick}
			padding='0.5rem'
			maxWidth='7.5rem'>
			<Stack direction='column' alignItems='center' justifyContent='center'>
				<Image
					draggable={false}
					borderRadius='full'
					boxSize='6.25rem'
					objectFit='cover'
					src={image}
					alt={title}
				/>
				<Typography center color={useColorModeValue('darkish', 'darkish')} variant='h5'>
					{title}
				</Typography>
			</Stack>
		</Box>
	);
};

export default CategoryItem;
