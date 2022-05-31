import { Box, Center, Grid, Stack } from '@chakra-ui/react';
import { Typography } from '@components';
import { Category } from '@utils/types';
import { useMemo } from 'react';

import { Category as CategoryComponent } from './Category';
import { CategoryBoxProps } from './types';

const CategoryBox = ({ categories }: CategoryBoxProps): JSX.Element => {
	const renderCategories = useMemo(
		(): JSX.Element[] =>
			categories.map((category: Category): JSX.Element => <CategoryComponent key={category.category} {...category} />),
		[categories]
	);

	return (
		<Center>
			<Box bgColor='#FFFFFF' borderRadius='2xl' display='flex' justifyContent='center' padding='1.5rem' width='87.5rem'>
				<Stack direction='column'>
					<Typography center variant='h2' color='grayish'>
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
