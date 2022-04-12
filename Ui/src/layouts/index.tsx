import { Box, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

import { Footer, Header } from '../components';
import { LayoutI } from './interfaces';

const Layout = ({ children }: LayoutI): JSX.Element => (
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
			backgroundColor={useColorModeValue('gray', 'darkish')}>
			{children}
		</Box>
		<Footer />
	</>
);

export default React.memo(Layout);
