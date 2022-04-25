import { GetServerSidePropsContext, NextPage, Redirect } from 'next';
import { dehydrate, useQuery } from 'react-query';
import fetchListing from '../../../api/listings/fetchListing';

import UpdateListingModule from '../../../modules/create-update-listing/update-listing';
import { fetchAccessToken, tryFetchQuery } from '../../../utils/helpers';
import { queryClient } from '../../../utils/queryClient';
import { UpdateListingPageProps } from './types';

const UpdateListingPage: NextPage<UpdateListingPageProps> = ({ accessToken, id }: UpdateListingPageProps) => {
	const { data } = useQuery(['fetchListing', id], () => fetchListing(id));
	const { title, description, category, images } = data!.listingInfo;

	return <UpdateListingModule accessToken={accessToken} initialValues={{ title, description, category, images }} />;
};

export async function getServerSideProps(
	context: GetServerSidePropsContext
): Promise<{ props: UpdateListingPageProps } | { redirect: Redirect }> {
	const id: string = context.params?.id as string;
	const accessToken: string | undefined = await fetchAccessToken(context);

	if (!accessToken) {
		return {
			redirect: {
				destination: '/listings',
				permanent: true,
			},
		};
	}

	return (
		(await tryFetchQuery(['fetchListing', id], () => fetchListing(id))) || {
			props: {
				accessToken,
				dehydratedState: dehydrate(queryClient),
				id,
			},
		}
	);
}

export default UpdateListingPage;
