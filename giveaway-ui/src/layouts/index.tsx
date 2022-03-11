import { Box, useColorModeValue } from '@chakra-ui/react';

import { Footer, Header } from '../components';
import { LayoutI } from './interfaces';

const Layout = ({ children }: LayoutI) => {
	return (
		<>
			<Header />
			<Box
				as='main'
				display='flex'
				flexDirection='column'
				justifyContent='center'
				marginLeft='auto'
				marginRight='auto'
				backgroundColor={useColorModeValue('grayish', 'darkish')}>
				{children}
			</Box>
			<Footer />
		</>
	);
};

export default Layout;
