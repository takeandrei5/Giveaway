import '../../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import { ChakraProvider } from '@chakra-ui/react';

import Layout from '../layouts';
import mainTheme from './mainTheme';

import type { AppProps } from 'next/app';
function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	return (
		<SessionProvider session={session} refetchInterval={30 * 60} refetchOnWindowFocus>
			<ChakraProvider theme={mainTheme}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</ChakraProvider>
		</SessionProvider>
	);
}

export default MyApp;
