import { Box, GridItem } from '@chakra-ui/react';
import { Image, Typography } from '@components';
import dateFormat from 'dateformat';
import { NextRouter, useRouter } from 'next/router';
import { useCallback } from 'react';

import { ItemProps } from './types';

const Item = ({ id, title, image, createdAt }: ItemProps): JSX.Element => {
	const router: NextRouter = useRouter();
	const onClickHandler = useCallback((): Promise<boolean> => router.push(`/listings/${id}`), [id]);

	const formatDate = (): string => dateFormat(createdAt, 'mmmm dS, yyyy "at" h:MM TT');

	return (
		<GridItem data-testid={'item'} key={id} w='100%' height='11.375rem' onClick={onClickHandler}>
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
				padding='0.625rem'>
				<Image objectFit='cover' height='auto' width='13.5rem' src={image} alt={title} />
				<Box display='flex' flexDir='column' marginLeft='0.625rem'>
					<Typography variant='h5'>{title}</Typography>
					<Box marginTop='auto'>
						<Typography variant='caption' prefix='Added on: '>
							{formatDate()}
						</Typography>
					</Box>
				</Box>
			</Box>
		</GridItem>
	);
};

export default Item;
