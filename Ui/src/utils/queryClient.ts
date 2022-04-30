import { QueryClient } from 'react-query';

const queryClient: QueryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnMount: true,
			refetchOnWindowFocus: false,
			refetchOnReconnect: true,
		},
	},
});

export default queryClient;
