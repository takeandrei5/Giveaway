import { Redirect } from 'next';
import { QueryFunction } from 'react-query';

import { BadRequestError, ForbiddenError, NotFoundError } from './errors';
import queryClient from './queryClient';

const tryFetchQuery = async (
	queryKey: string[],
	queryFn: QueryFunction<unknown, string[]>
): Promise<{ redirect: Redirect } | undefined> => {
	try {
		await queryClient.fetchQuery(queryKey, queryFn);
	} catch (err) {
		console.error(err);

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

const checkArgumentForNullish = <T>(argument: T | undefined, errorMessage: string): T => {
	if (!argument) {
		throw new BadRequestError(errorMessage);
	}

	return argument as T;
};

export { checkArgumentForNullish, tryFetchQuery };
