import { Box, Center, Grid, GridItem, Stack, useColorModeValue } from '@chakra-ui/react';

import { SearchBox, Typography } from '../components';
import CategoryItem from '../components/standalone/CategoryItem/CategoryItem';

import type { NextPage } from 'next';

const Home: NextPage = () => {
	return (
		<>
			<SearchBox />
			<Center>
				<Box
					bgColor='#FFFFFF'
					borderRadius='2xl'
					display='flex'
					justifyContent='center'
					marginTop='3rem'
					padding='3rem'
					width='87.5rem'></Box>
			</Center>
		</>
	);
};

export default Home;
