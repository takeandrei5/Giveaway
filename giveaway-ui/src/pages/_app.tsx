import '../../styles/globals.css';

import { ChakraProvider } from '@chakra-ui/react';

import mainTheme from './mainTheme';

import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider theme={mainTheme}>
			<Component {...pageProps} />
		</ChakraProvider>
	);
}

export default MyApp;
