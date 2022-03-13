import { Box, useColorModeValue } from '@chakra-ui/react';

import { Footer, Header, SearchBox } from '../components';
import { LayoutI } from './interfaces';

const Layout = ({ children }: LayoutI) => {
	return (
		<>
			<Box display='flex' flexDirection='column' height='100%'>
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
					backgroundColor={useColorModeValue('grayish', 'darkish')}>
					<SearchBox />
					{children}
				</Box>
			</Box>
			<Footer />
		</>
	);
};

export default Layout;
