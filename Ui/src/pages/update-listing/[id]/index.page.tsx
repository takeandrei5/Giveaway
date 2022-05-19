import { fetchListing } from '@api/listings';
import { FetchListingDetailsResponse } from '@api/listings/types';
import { getSession } from '@auth0/nextjs-auth0';
import { UpdateListingModule } from '@modules';
import { NotFoundError } from '@utils/errors';
import queryClient from '@utils/queryClient';
import { GetServerSidePropsContext, NextPage, Redirect } from 'next';
import { dehydrate, useQuery } from 'react-query';

import { UpdateListingPageProps } from './types';

const UpdateListingPage: NextPage<UpdateListingPageProps> = ({ accessToken, id }: UpdateListingPageProps) => {
	const { data } = useQuery(['fetchListing', id], () => fetchListing(id));

	return <UpdateListingModule accessToken={accessToken} id={id} initialValues={{ ...data!.listingInfo }} />;
};

export async function getServerSideProps(
	context: GetServerSidePropsContext
): Promise<{ props: UpdateListingPageProps } | { redirect: Redirect }> {
	const id: string = context.params?.id as string;

	const session = getSession(context.req, context.res);

	try {
		const result: FetchListingDetailsResponse | undefined = await queryClient.fetchQuery(['fetchListing', id], () =>
			fetchListing(id)
		);

		if (!session || !session.user || !session.accessToken) {
			return {
				redirect: {
					destination: '/listings',
					permanent: true,
				},
			};
		}

		if (session.user.email !== result!.ownerInfo.email) {
			return {
				redirect: {
					permanent: true,
					destination: '/404',
				},
			};
		}

		return {
			props: {
				accessToken: session.accessToken,
				dehydratedState: dehydrate(queryClient),
				id,
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
}

export default UpdateListingPage;
