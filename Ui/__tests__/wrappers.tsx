import store from '@redux/store';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
		},
	},
});

const QueryClientWrapper = ({ children }: { children: JSX.Element }): JSX.Element => {
	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

const ProviderWrapper = ({ children }: { children: JSX.Element }): JSX.Element => {
	return <Provider store={store}>{children}</Provider>;
};

export { ProviderWrapper, QueryClientWrapper };
