import { Center, Divider, Flex, Grid, GridItem, Image } from '@chakra-ui/react';
import { NextPage } from 'next/types';

import { Skeleton, Typography } from '../../../components';

const Listing: NextPage = () => {
	return (
		<>
			<Skeleton borderRadius='2xl' isLoaded={true}>
				<Grid>
					<Center borderRadius='2xl' bgColor='white' padding='1.5rem' height='31.25rem'>
						<Image
							draggable={false}
							boxSize='100%'
							objectFit='contain'
							src='https://frankfurt.apollo.olxcdn.com/v1/files/tj6e37yggawb2-RO/image;s=1000x700'
							alt='listing image'
						/>
					</Center>
					<Grid templateColumns='repeat(12, 1fr)' gap={5} marginTop='1rem'>
						<GridItem colSpan={8}>
							<Flex
								direction='column'
								borderRadius='2xl'
								bgColor='white'
								padding='1.5rem'
								maxWidth='100%'
								rowGap='0.625rem'>
								<Typography variant='caption'>Posted at: 2022-04-14</Typography>
								<Typography variant='h3'>This is a test variant</Typography>
								<Typography variant='paragraph' multiline>
									This is a description long description long description long description long description long
									description long description long description long description long description long description long
									description long description long description long description long description long description long
									description long description long description long description long description long description long
									description long description long description long description long
								</Typography>
							</Flex>
						</GridItem>
						<GridItem colSpan={4}>
							<Flex
								height='100%'
								direction='column'
								borderRadius='2xl'
								bgColor='white'
								padding='1.5rem'
								maxWidth='100%'
								rowGap='0.3125rem'>
								<Typography variant='h3'>Contact Information</Typography>
								<Divider />
								<Flex alignItems='center' columnGap='0.625rem' height='fit-content'>
									<Typography variant='h5'>Owner:</Typography>
									<Typography variant='paragraph'>Andrei Claudiu</Typography>
								</Flex>
								<Flex alignItems='center' columnGap='0.625rem' height='fit-content'>
									<Typography variant='h5'>Email:</Typography>
									<Typography variant='paragraph'>takeandrei5@gmail.com</Typography>
								</Flex>
							</Flex>
						</GridItem>
					</Grid>
				</Grid>
			</Skeleton>
		</>
	);
};

export default Listing;
