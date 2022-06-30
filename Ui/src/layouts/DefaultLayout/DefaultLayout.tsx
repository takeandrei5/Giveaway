import { Box, useColorModeValue } from '@chakra-ui/react';
import { Footer, Header } from '@components';
import React from 'react';

import { DefaultLayoutProps } from './types';

const DefaultLayout = ({ children }: DefaultLayoutProps): JSX.Element => (
	<>
		<Header />
		<Box
			as='main'
			minHeight='100%'
			width='100%'
			display='flex'
			flexDirection='column'
			marginLeft='auto'
			marginRight='auto'
			paddingY='5rem'
			paddingX='18rem'
			backgroundColor='gray'>
			{children}
		</Box>
		<Footer />
	</>
);

export default React.memo(DefaultLayout);
