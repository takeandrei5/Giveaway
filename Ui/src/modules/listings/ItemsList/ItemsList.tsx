import { Box, Grid, GridItem, Image } from '@chakra-ui/react';
import { ItemData } from 'api/listings/types';
import { Typography } from 'components';
import dateFormat from 'dateformat';
import { NextRouter, useRouter } from 'next/router';
import { useMemo } from 'react';

import { ItemsProps } from './types';

const ItemsList = ({ items }: ItemsProps): JSX.Element => {
	const router: NextRouter = useRouter();

	const renderItems = useMemo(
		(): JSX.Element[] =>
			items.map(
				(item: ItemData): JSX.Element => (
					<GridItem key={item.id} w='100%' height='11.375rem'>
						<Box
							_hover={{
								cursor: 'pointer',
								filter: 'brightness(95%)',
							}}
							_active={{ filter: 'brightness(90%)' }}
							h='100%'
							w='100%'
							bgColor='white'
							borderRadius='2xl'
							display='flex'
							flexDir='row'
							padding='0.625rem'
							onClick={() => router.push(`/listings/${item.id}`)}>
							<Image
								draggable={false}
								height='auto'
								objectFit='cover'
								width='13.5rem'
								src={item.image}
								alt={item.title}
							/>
							<Box display='flex' flexDir='column' marginLeft='0.625rem'>
								<Typography variant='h5'>{item.title}</Typography>
								<Box marginTop='auto'>
									<Typography variant='caption' prefix='Added on: '>
										{dateFormat(item.createdAt, 'mmmm dS, yyyy "at" h:MM TT')}
									</Typography>
								</Box>
							</Box>
						</Box>
					</GridItem>
				)
			),
		[items, router]
	);

	return (
		<Grid marginTop='1rem' justifyItems='center' rowGap='4'>
			{renderItems}
		</Grid>
	);
};

export default ItemsList;
