import { Box, GridItem, Stack, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { Image, Typography } from '@components';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { changeCategory } from '@redux/slices/changeCategorySlice';
import { useCallback } from 'react';

import { CategoryProps } from './types';

const Category = ({ name, image, category }: CategoryProps) => {
	const dispatch = useAppDispatch();
	const categoryState = useAppSelector((state) => state.changeCategory);

	const lightOrDarkColor: 'light' | 'dark' = useColorModeValue('light', 'dark');
	const darkOrLightColor: 'dark' | 'light' = useColorModeValue('dark', 'light');

	const onClickHandler = useCallback(() => dispatch(changeCategory(category)), [category]);

	return (
		<GridItem key={name} w='100%'>
			<Box
				data-testid='category-box'
				_hover={{
					cursor: 'pointer',
					filter: 'brightness(90%)',
				}}
				_active={{ filter: 'brightness(80%)' }}
				bgColor='transparent'
				onClick={onClickHandler}
				padding='0.5rem'
				maxWidth='7.5rem'
				__css={{
					'& span': {
						color: categoryState.category == category ? `primary.${lightOrDarkColor}` : darkOrLightColor,
					},
				}}>
				<Stack direction='column' alignItems='center' justifyContent='center'>
					<Image
						draggable={false}
						backgroundColor={`primary.${lightOrDarkColor}`}
						borderRadius='full'
						height='6.25rem'
						width='6.25rem'
						objectFit='cover'
						src={image}
						alt={name}
					/>
					<Typography center color='dark' variant='h5'>
						{name}
					</Typography>
				</Stack>
			</Box>
		</GridItem>
	);
};

export default Category;
