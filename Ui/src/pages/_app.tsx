import '../../styles/globals.css';

import { UserProvider } from '@auth0/nextjs-auth0';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';

import { store } from '../redux';

import Layout from '../layouts';
import mainTheme from '../utils/mainTheme';

import type { AppProps } from 'next/app';

const MyApp = ({ Component, pageProps: { session, ...pageProps } }: AppProps): JSX.Element => (
	<Provider store={store}>
		<UserProvider>
			<ChakraProvider theme={mainTheme}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</ChakraProvider>
		</UserProvider>
	</Provider>
);

export default MyApp;
