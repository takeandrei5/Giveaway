import '../../styles/globals.css';

import { UserProvider } from '@auth0/nextjs-auth0';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';

import store from '../redux/store';

import Layout from '../layouts';
import mainTheme from '../utils/mainTheme';

import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

import type { AppProps } from 'next/app';

const MyApp = ({ Component, pageProps: { session, ...pageProps } }: AppProps): JSX.Element => (
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistStore(store)}>
			<UserProvider>
				<ChakraProvider theme={mainTheme}>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</ChakraProvider>
			</UserProvider>
		</PersistGate>
	</Provider>
);

export default MyApp;
