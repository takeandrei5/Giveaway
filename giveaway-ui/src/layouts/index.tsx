import { Box, useColorModeValue } from '@chakra-ui/react';

import { Footer, Header, SearchBox } from '../components';
import { LayoutI } from './interfaces';

const Layout = ({ children }: LayoutI) => {
	return (
		<Box boxSizing='border-box'>
			<Header />
			<Box
				as='main'
				display='flex'
				flexDirection='column'
				justifyContent='center'
				marginLeft='auto'
				marginRight='auto'
				paddingTop='5rem'
				backgroundColor={useColorModeValue('grayish', 'darkish')}>
				<SearchBox />
				{children}
			</Box>
			<Footer />
		</Box>
	);
};

export default Layout;
