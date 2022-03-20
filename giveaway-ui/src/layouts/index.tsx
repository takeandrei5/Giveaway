import { Box, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

import { Footer, Header, SearchBox } from '../components';
import { LayoutI } from './interfaces';

const Layout = ({ children }: LayoutI) => (
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
			paddingTop='5rem'
			paddingX='8rem'
			backgroundColor={useColorModeValue('grayish', 'darkish')}>
			{children}
		</Box>
		<Footer />
	</>
);

export default React.memo(Layout);
