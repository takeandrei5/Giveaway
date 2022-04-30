import '../../styles/globals.css';

import { UserProvider } from '@auth0/nextjs-auth0';
import { ChakraProvider } from '@chakra-ui/react';
import { DefaultLayout } from 'layouts';
import { Hydrate, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import store from 'redux/store';
import mainTheme from 'utils/mainTheme';
import queryClient from 'utils/queryClient';

import type { AppProps } from 'next/app';

const MyApp = ({ Component, pageProps: { session, ...pageProps } }: AppProps): JSX.Element => (
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistStore(store)}>
			<UserProvider>
				<ChakraProvider theme={mainTheme}>
					<QueryClientProvider client={queryClient}>
						<Hydrate state={pageProps.dehydratedState}>
							<DefaultLayout>
								<Component {...pageProps} />
								{process.env.NODE_ENV === 'development' && (
									<ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
								)}
							</DefaultLayout>
						</Hydrate>
					</QueryClientProvider>
				</ChakraProvider>
			</UserProvider>
		</PersistGate>
	</Provider>
);

export default MyApp;
