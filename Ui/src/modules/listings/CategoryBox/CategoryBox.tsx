import { Box, Center, Grid, GridItem, Image, Stack } from '@chakra-ui/react';
import { useMemo } from 'react';

import { Typography } from '../../../components';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { changeCategory } from '../../../redux/slices/changeCategorySlice';
import { Category } from '../../../utils/types';
import { CategoryBoxProps } from './types';

const CategoryBox = ({ categories }: CategoryBoxProps): JSX.Element => {
	const dispatch = useAppDispatch();
	const categoryState = useAppSelector((state) => state.changeCategory);

	const renderCategories = useMemo(
		(): JSX.Element[] =>
			categories.map(
				(category: Category): JSX.Element => (
					<GridItem key={category.name} w='100%'>
						<Box
							_hover={{
								cursor: 'pointer',
								filter: categoryState.category == category.category ? 'brightness(60%)' : 'brightness(90%)',
								'& span': { filter: categoryState.category == category.category ? 'opacity(0.6)' : 'opacity(0.9)' },
							}}
							_active={{ filter: 'brightness(80%)', '& span': { filter: 'opacity(0.8)' } }}
							bgColor='transparent'
							onClick={() => dispatch(changeCategory(category.category))}
							padding='0.5rem'
							maxWidth='7.5rem'
							filter={categoryState.category == category.category ? 'brightness(70%)' : 'auto'}
							__css={{
								'& span': {
									filter: categoryState.category == category.category ? 'opacity(0.7)' : 'auto',
								},
							}}>
							<Stack direction='column' alignItems='center' justifyContent='center'>
								<Image
									draggable={false}
									borderRadius='full'
									boxSize='6.25rem'
									objectFit='cover'
									src={category.image}
									alt={category.name}
								/>
								<Typography center color={'darkish'} variant='h5'>
									{category.name}
								</Typography>
							</Stack>
						</Box>
					</GridItem>
				)
			),
		[categories, categoryState]
	);

	return (
		<Center>
			<Box bgColor='#FFFFFF' borderRadius='2xl' display='flex' justifyContent='center' padding='1.5rem' width='87.5rem'>
				<Stack direction='column'>
					<Typography center variant='h2' color={'grayish'}>
						Select from these main categories
					</Typography>
					<Grid justifyItems='center' marginTop='1rem !important' templateColumns='repeat(4, 1fr)' gap={10}>
						{renderCategories}
					</Grid>
				</Stack>
			</Box>
		</Center>
	);
};

export default CategoryBox;
