import { Box, GridItem, useColorModeValue } from '@chakra-ui/react';
import { Image, Typography } from '@components';
import dateFormat from 'dateformat';
import { NextRouter, useRouter } from 'next/router';
import { useCallback } from 'react';

import { ItemProps } from './types';

const Item = ({ id, title, image, createdAt }: ItemProps): JSX.Element => {
	const router: NextRouter = useRouter();

	const lightOrDarkColor: 'light' | 'dark' = useColorModeValue('light', 'dark');
	const darkOrLightColor: 'dark' | 'light' = useColorModeValue('dark', 'light');

	const onClickHandler = useCallback((): Promise<boolean> => router.push(`/listings/${id}`), [id]);

	const formatDate = useCallback((): string => dateFormat(createdAt, 'mmmm dS, yyyy "at" h:MM TT'), [createdAt]);

	return (
		<GridItem
			_hover={{
				cursor: 'pointer',
				filter: 'brightness(90%)',
			}}
			_active={{
				filter: 'brightness(80%)',
			}}
			cursor='pointer'
			data-testid='item'
			key={id}
			w='100%'
			height='11.375rem'
			onClick={onClickHandler}
			userSelect='none'>
			<Box
				h='100%'
				w='100%'
				boxShadow='base'
				position='relative'
				bgColor='white'
				borderRadius='2xl'
				display='flex'
				flexDir='row'
				padding='0.625rem'>
				<Image objectFit='cover' height='auto' width='13.5rem' src={image} alt={title} />
				<Box display='flex' flexDir='column' marginLeft='0.625rem'>
					<Typography color={darkOrLightColor} variant='h5'>
						{title}
					</Typography>
					<Box marginTop='auto'>
						<Typography variant='caption' color={darkOrLightColor} prefix='Added on: '>
							{formatDate()}
						</Typography>
					</Box>
				</Box>
			</Box>
		</GridItem>
	);
};

export default Item;
