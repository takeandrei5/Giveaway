import { Redirect } from 'next';
import { QueryFunction } from 'react-query';

import { ForbiddenError, NotFoundError } from './errors';
import queryClient from './queryClient';

const tryFetchQuery = async (
	queryKey: any[],
	queryFn: QueryFunction<any, any[]>
): Promise<{ redirect: Redirect } | undefined> => {
	try {
		await queryClient.fetchQuery(queryKey, queryFn);
	} catch (err) {
		if (err instanceof NotFoundError) {
			return {
				redirect: {
					permanent: true,
					destination: '/404',
				},
			};
		}

		if (err instanceof ForbiddenError) {
			return {
				redirect: {
					permanent: true,
					destination: '/403',
				},
			};
		}

		return {
			redirect: {
				permanent: true,
				destination: '/500',
			},
		};
	}
};

export { tryFetchQuery };
