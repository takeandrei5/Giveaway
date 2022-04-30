import { Box, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

import { Footer } from './Footer';
import { Header } from './Header';
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
			paddingX='25rem'
			backgroundColor={useColorModeValue('lightish', 'darkish')}>
			{children}
		</Box>
		<Footer />
	</>
);

export default React.memo(DefaultLayout);
