import { getAccessToken } from '@auth0/nextjs-auth0';
import { GetServerSidePropsContext, Redirect } from 'next';
import { QueryFunction } from 'react-query';

import { ForbiddenError, NotFoundError } from './errors';
import queryClient from './queryClient';

const fetchAccessToken = async (context: GetServerSidePropsContext): Promise<string | undefined> => {
	try {
		const { accessToken } = await getAccessToken(context.req, context.res);

		return accessToken;
	} catch (err) {
		console.error(err);
		throw new Error((err as Error).message);
	}
};

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

export { fetchAccessToken, tryFetchQuery };
