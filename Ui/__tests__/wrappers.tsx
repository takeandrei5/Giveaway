import { QueryClient, QueryClientProvider } from 'react-query';

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

export { QueryClientWrapper };
