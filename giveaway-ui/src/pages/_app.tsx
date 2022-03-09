import '../../styles/globals.css';

import { ChakraProvider } from '@chakra-ui/react';

import Layout from '../layouts';
import mainTheme from './mainTheme';

import type { AppProps } from 'next/app';
function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider theme={mainTheme}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</ChakraProvider>
	);
}

export default MyApp;
