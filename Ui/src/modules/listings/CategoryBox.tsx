import { Box, Center, Grid, GridItem, Stack } from '@chakra-ui/react';
import { useMemo } from 'react';

import { CategoryItem, Typography } from '../../components';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { changeCategory } from '../../redux/slices/changeCategorySlice';
import { CategoryBoxI, CategoryItemI } from './interfaces';

const CategoryBox = ({ categories }: CategoryBoxI): JSX.Element => {
	const dispatch = useAppDispatch();
	const categoryState = useAppSelector((state) => state.changeCategory);

	const renderCategories = useMemo(
		(): JSX.Element[] =>
			categories.map(
				(categoryItem: CategoryItemI): JSX.Element => (
					<GridItem key={categoryItem.name} w='100%'>
						<CategoryItem
							active={categoryState.category == categoryItem.category}
							image={categoryItem.image}
							name={categoryItem.name}
							onClick={() => dispatch(changeCategory(categoryItem.category))}
						/>
					</GridItem>
				)
			),
		[categories, categoryState]
	);

	return (
		<Center>
			<Box
				bgColor='#FFFFFF'
				borderRadius='2xl'
				display='flex'
				justifyContent='center'
				padding='1.5rem'
				width='87.5rem'>
				<Stack direction='column'>
					<Typography center variant='h2' color={'grayish'}>
						Select from these main categories
					</Typography>
					<Grid
						justifyItems='center'
						marginTop='1rem !important'
						templateColumns='repeat(4, 1fr)'
						gap={10}>
						{renderCategories}
					</Grid>
				</Stack>
			</Box>
		</Center>
	);
};

export default CategoryBox;
