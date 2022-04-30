import { Box, Container, Link, SimpleGrid, Stack } from '@chakra-ui/react';
import { Logo, Typography } from 'components';
import React from 'react';

import { stackItems } from './constants';
import { StackItem } from './types';

const Footer = (): JSX.Element => {
	const renderStackItems = (stackItems: StackItem[]): JSX.Element[] =>
		stackItems.map(
			(stackItem: StackItem): JSX.Element => (
				<Stack key={`footer-stack-${stackItem.stackColumnName}`} align={'flex-start'}>
					<Typography variant='h5'>{stackItem.stackColumnName}</Typography>
					{stackItem.stackColumnItems.map(
						(stackColumnItem: string): JSX.Element => (
							<Link key={`${stackColumnItem}-child`} href={'#'}>
								{stackColumnItem}
							</Link>
						)
					)}
				</Stack>
			)
		);

	return (
		<Box bg={'secondary.main'} color={'white'}>
			<Container as={Stack} maxW={'6xl'} py={10}>
				<SimpleGrid templateColumns={{ sm: '1fr 1fr', md: '2fr 1fr 1fr 1fr 1fr' }} spacing={8}>
					<Stack display={'flex'} alignItems={'start'} spacing={6}>
						<Logo onClick={() => {}} />
						<Typography variant='paragraph'>© 2020 Chakra Templates. All rights reserved</Typography>
					</Stack>
					{renderStackItems(stackItems)}
				</SimpleGrid>
			</Container>
		</Box>
	);
};

export default React.memo(Footer);
