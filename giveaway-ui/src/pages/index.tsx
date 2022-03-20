import { Box, Center, Grid, GridItem, Stack } from '@chakra-ui/react';

import { SearchBox, Typography } from '../components';
import CategoryItem from '../components/standalone/CategoryItem/CategoryItem';

import type { NextPage } from 'next';

const Home: NextPage = () => {
	return (
		<>
			<SearchBox />
			<Center>
				<Box
					bgColor='white'
					borderRadius='2xl'
					display='flex'
					justifyContent='center'
					marginTop='3rem'
					padding='3rem'
					width='87.5rem'>
					<Stack direction='column'>
						<Typography center variant='h1'>
							Main categories
						</Typography>
						<Grid marginTop='1rem !important' templateColumns='repeat(8, 1fr)' gap={10}>
							<GridItem w='100%'>
								<CategoryItem
									image='https://i.ibb.co/tL11nRC/Capture.png'
									title='Men Clothes'
									onClick={() => alert('clicked')}
								/>
							</GridItem>
							<GridItem w='100%'>
								<CategoryItem
									image='https://i.ibb.co/tL11nRC/Capture.png'
									title='Women Clothes'
									onClick={() => alert('clicked')}
								/>
							</GridItem>
							<GridItem w='100%'>
								<CategoryItem
									image='https://i.ibb.co/tL11nRC/Capture.png'
									title='Kids Clothes'
									onClick={() => alert('clicked')}
								/>
							</GridItem>
							<GridItem w='100%'>
								<CategoryItem
									image='https://i.ibb.co/tL11nRC/Capture.png'
									title='Toys'
									onClick={() => alert('clicked')}
								/>
							</GridItem>
							<GridItem w='100%'>
								<CategoryItem
									image='https://i.ibb.co/tL11nRC/Capture.png'
									title='Furniture'
									onClick={() => alert('clicked')}
								/>
							</GridItem>
							<GridItem w='100%'>
								<CategoryItem
									image='https://i.ibb.co/tL11nRC/Capture.png'
									title='Men Footwear'
									onClick={() => alert('clicked')}
								/>
							</GridItem>
							<GridItem w='100%'>
								<CategoryItem
									image='https://i.ibb.co/tL11nRC/Capture.png'
									title='Women Footwear'
									onClick={() => alert('clicked')}
								/>
							</GridItem>
							<GridItem w='100%'>
								<CategoryItem
									image='https://i.ibb.co/tL11nRC/Capture.png'
									title='Kids Footwear'
									onClick={() => alert('clicked')}
								/>
							</GridItem>
						</Grid>
					</Stack>
				</Box>
			</Center>
		</>
	);
};

export default Home;
