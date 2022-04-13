import '../../styles/globals.css';

import { UserProvider } from '@auth0/nextjs-auth0';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import Layout from '../layouts';
import store from '../redux/store';
import mainTheme from '../utils/mainTheme';
import { queryClient } from '../utils/queryClient';

import type { AppProps } from 'next/app';
const MyApp = ({ Component, pageProps: { session, ...pageProps } }: AppProps): JSX.Element => (
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistStore(store)}>
			<UserProvider>
				<ChakraProvider theme={mainTheme}>
					<QueryClientProvider client={queryClient}>
						<Layout>
							<Component {...pageProps} />
						</Layout>
					</QueryClientProvider>
				</ChakraProvider>
			</UserProvider>
		</PersistGate>
	</Provider>
);

export default MyApp;
