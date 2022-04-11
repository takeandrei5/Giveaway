import { Box, Center, Grid, GridItem, Stack } from '@chakra-ui/react';
import { useMemo } from 'react';

import { CategoryItem, Typography } from '../../components';
import { useAppDispatch, useAppSelector } from '../../redux';
import { changeCategory } from '../../redux/slices/changeCategorySlice';
import { CategoryBoxI } from './interfaces';

const CategoryBox = ({ categories }: CategoryBoxI) => {
	const dispatch = useAppDispatch();
	const categoryState = useAppSelector((state) => state.changeCategory.category);

	const renderCategories = useMemo((): JSX.Element[] => {
		return categories.map((category) => {
			return (
				<GridItem key={category.name} w='100%'>
					<CategoryItem
						active={categoryState == category.category}
						image={category.image}
						name={category.name}
						onClick={() => dispatch(changeCategory(category.category))}
					/>
				</GridItem>
			);
		});
	}, [categories, categoryState]);

	return (
		<Center>
			<Box bgColor='#FFFFFF' borderRadius='2xl' display='flex' justifyContent='center' padding='3rem' width='87.5rem'>
				<Stack direction='column'>
					<Typography center variant='h2' color={'grayish'}>
						Select from these main categories
					</Typography>
					<Grid justifyItems='center' marginTop='1rem !important' templateColumns='repeat(5, 1fr)' gap={10}>
						{renderCategories}
					</Grid>
				</Stack>
			</Box>
		</Center>
	);
};

export default CategoryBox;
