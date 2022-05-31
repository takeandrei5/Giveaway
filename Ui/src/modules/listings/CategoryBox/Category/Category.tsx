import { Box, GridItem, Stack } from '@chakra-ui/react';
import { Image, Typography } from '@components';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { changeCategory } from '@redux/slices/changeCategorySlice';
import { useCallback } from 'react';

import { CategoryProps } from './types';

const Category = ({ name, image, category }: CategoryProps) => {
	const dispatch = useAppDispatch();
	const categoryState = useAppSelector((state) => state.changeCategory);

	const onClickHandler = useCallback(() => dispatch(changeCategory(category)), [category]);

	return (
		<GridItem key={name} w='100%'>
			<Box
				data-testid='category-box'
				_hover={{
					cursor: 'pointer',
					filter: categoryState.category == category ? 'brightness(60%)' : 'brightness(90%)',
					'& span': { filter: categoryState.category == category ? 'opacity(0.6)' : 'opacity(0.9)' },
				}}
				_active={{ filter: 'brightness(80%)', '& span': { filter: 'opacity(0.8)' } }}
				bgColor='transparent'
				onClick={onClickHandler}
				padding='0.5rem'
				maxWidth='7.5rem'
				filter={categoryState.category == category ? 'brightness(70%)' : 'auto'}
				__css={{
					'& span': {
						filter: categoryState.category == category ? 'opacity(0.7)' : 'auto',
					},
				}}>
				<Stack direction='column' alignItems='center' justifyContent='center'>
					<Image
						draggable={false}
						backgroundColor='primary.dark'
						borderRadius='full'
						height='6.25rem'
						width='6.25rem'
						objectFit='cover'
						src={image}
						alt={name}
					/>
					<Typography center color={'darkish'} variant='h5'>
						{name}
					</Typography>
				</Stack>
			</Box>
		</GridItem>
	);
};

export default Category;
