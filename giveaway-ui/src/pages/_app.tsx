import '../../styles/globals.css';

import { UserProvider } from '@auth0/nextjs-auth0';
import { ChakraProvider } from '@chakra-ui/react';
import { useEffect } from 'react';

import Layout from '../layouts';
import mainTheme from './mainTheme';

import type { AppProps } from 'next/app';

const MyApp = ({ Component, pageProps: { session, ...pageProps } }: AppProps): JSX.Element => (
	<UserProvider>
		<ChakraProvider theme={mainTheme}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</ChakraProvider>
	</UserProvider>
);

export default MyApp;
