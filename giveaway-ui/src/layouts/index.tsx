import { Box, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

import { Footer, Header, SearchBox } from '../components';
import { LayoutI } from './interfaces';

const Layout = ({ children }: LayoutI) => (
	<>
		<Header />
		<Box
			as='main'
			height='100%'
			width='100%'
			display='flex'
			flexDirection='column'
			marginLeft='auto'
			marginRight='auto'
			paddingTop='5rem'
			paddingX={'2.5rem'}
			backgroundColor={useColorModeValue('grayish', 'darkish')}>
			<SearchBox />
			{children}
		</Box>
		<Footer />
	</>
);

export default React.memo(Layout);
