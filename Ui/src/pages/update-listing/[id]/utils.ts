import { fetchListing } from '@api/webapi/listings/client-side';
import { FetchListingDetailsResponse } from '@api/webapi/listings/types';
import { getSession, Session } from '@auth0/nextjs-auth0';
import { axiosInstance } from '@utils/axios';
import { NotFoundError } from '@utils/errors';
import queryClient from '@utils/queryClient';
import { GetServerSidePropsContext, Redirect } from 'next';
import { dehydrate, QueryFunctionContext } from 'react-query';

import { UpdateListingPageProps } from './types';

const getUpdateListingServerSideProps = async (
	context: GetServerSidePropsContext
): Promise<{ props: UpdateListingPageProps } | { redirect: Redirect }> => {
	const id: string = context.query?.id as string;

	if (!id) {
		return {
			redirect: {
				permanent: true,
				destination: '/404',
			},
		};
	}

	const session: Session | null | undefined = getSession(context.req, context.res);

	if (!session || !session.user || !session.accessToken) {
		return {
			redirect: {
				destination: '/listings',
				permanent: true,
			},
		};
	}

	try {
		const result: FetchListingDetailsResponse | undefined = await queryClient.fetchQuery(
			['fetchListing', id],
			({ signal }: QueryFunctionContext<string[], unknown>) => fetchListing(id, signal)
		);

		if (!result || session.user.email !== result!.ownerInfo.email) {
			return {
				redirect: {
					permanent: true,
					destination: '/404',
				},
			};
		}

		return {
			props: {
				dehydratedState: dehydrate(queryClient),
				id,
				listingInfo: result.listingInfo,
			},
		};
	} catch (err) {
		console.error('Fetch listings failed', err);

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

export { getUpdateListingServerSideProps };
