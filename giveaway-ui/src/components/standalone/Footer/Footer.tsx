import { Box, Container, Link, SimpleGrid, Stack, useColorModeValue } from '@chakra-ui/react';

import { Logo } from '../../shared';
import Typography from '../../shared/Typography/Typography';
import { stackItems } from './constants';
import { StackItemI } from './interfaces';

const Footer = (): JSX.Element => {
	const renderStackItems = (stackItems: StackItemI[]) =>
		stackItems.map((stackItem: StackItemI, index: number) => (
			<Stack key={`footer-stack-${index}`} align={'flex-start'}>
				<Typography variant='h5'>{stackItem.stackColumnName}</Typography>
				{stackItem.stackColumnItems.map((stackColumnItem: string, index: number) => (
					<Link key={`${stackItem}-child-${index}`} href={'#'}>
						{stackColumnItem}
					</Link>
				))}
			</Stack>
		));

	return (
		<Box
			bg={useColorModeValue('secondary.main', 'secondary.main')}
			color={useColorModeValue('white', 'white')}>
			<Container as={Stack} maxW={'6xl'} py={10}>
				<SimpleGrid templateColumns={{ sm: '1fr 1fr', md: '2fr 1fr 1fr 1fr 1fr' }} spacing={8}>
					<Stack display={'flex'} alignItems={'start'} spacing={6}>
						<Logo />
						<Typography variant='paragraph'>
							© 2020 Chakra Templates. All rights reserved
						</Typography>
					</Stack>
					{renderStackItems(stackItems)}
				</SimpleGrid>
			</Container>
		</Box>
	);
};

export default Footer;
