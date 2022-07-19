import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import { Footer, Header } from '@components';
import React from 'react';

import { DefaultLayoutProps } from './types';

const DefaultLayout = ({ children }: DefaultLayoutProps): JSX.Element => (
	<>
		<Header />
		<Flex
			as='main'
			backgroundColor='gray'
			flexDirection='column'
			minHeight='100%'
			marginX='auto'
			paddingX='18rem'
			paddingY='5rem'
			width='100%'>
			{children}
		</Flex>
		<Footer />
	</>
);

export default React.memo(DefaultLayout);
