import { getAccessToken } from '@auth0/nextjs-auth0';
import { GetServerSidePropsContext, Redirect } from 'next';
import { QueryFunction } from 'react-query';

import { NotFoundError } from './errors';
import { queryClient } from './queryClient';

const fetchAccessToken = async (context: GetServerSidePropsContext): Promise<string | undefined> => {
	try {
		const { accessToken } = await getAccessToken(context.req, context.res);

		return accessToken;
	} catch (err) {}
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

		return {
			redirect: {
				permanent: true,
				destination: '/500',
			},
		};
	}
};

const tryFetchQueryT = async <T>(
	queryKey: any[],
	queryFn: QueryFunction<any, any[]>
): Promise<{ redirect: Redirect } | T | undefined> => {
	try {
		return await queryClient.fetchQuery(queryKey, queryFn);
	} catch (err) {
		if (err instanceof NotFoundError) {
			return {
				redirect: {
					permanent: true,
					destination: '/404',
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

export { fetchAccessToken, tryFetchQuery, tryFetchQueryT };
