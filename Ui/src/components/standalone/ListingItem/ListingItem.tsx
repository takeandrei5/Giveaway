import { Box, Image } from '@chakra-ui/react';

import dateFormat from 'dateformat';
import { Typography } from '../../shared';
import { ListingItemI } from './interfaces';

const ListingItem = ({ image, title, createdOn, onClick }: ListingItemI) => {
	return (
		<Box
			_hover={{
				cursor: 'pointer',
				filter: 'brightness(95%)',
			}}
			_active={{ filter: 'brightness(90%)' }}
			maxH='12rem'
			w='100%'
			bgColor='white'
			borderRadius='2xl'
			display='flex'
			flexDir='row'
			padding='0.625rem'
			onClick={onClick}>
			<Image
				draggable={false}
				height='auto'
				objectFit='cover'
				width='13.5rem'
				src={image}
				alt={title}
			/>
			<Box display='flex' flexDir='column' marginLeft='0.625rem'>
				<Typography variant='h5'>{title}</Typography>
				<Box marginTop='auto'>
					<Typography variant='caption' prefix='Listing added on: '>
						{dateFormat(createdOn, 'mmmm dS, yyyy "at" h:MM TT')}
					</Typography>
				</Box>
			</Box>
		</Box>
	);
};

export default ListingItem;
