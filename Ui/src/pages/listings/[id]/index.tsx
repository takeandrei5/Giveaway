import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import { GetServerSidePropsContext, NextPage, Redirect } from 'next/types';
import { dehydrate } from 'react-query';

import { ListingDetailsModule } from '../../../modules';
import { fetchAccessToken, tryFetchQuery } from '../../../utils/helpers';
import { queryClient } from '../../../utils/queryClient';
import { fetchListing } from './apis';
import { ListingDetailsPageProps } from './types';

const ListingDetailsPage: NextPage<ListingDetailsPageProps> = ({ accessToken, id }: ListingDetailsPageProps) => (
	<ListingDetailsModule id={id} accessToken={accessToken} />
);

export async function getServerSideProps(
	context: GetServerSidePropsContext
): Promise<{ props: ListingDetailsPageProps } | { redirect: Redirect }> {
	const id: string = context.params?.id as string;

	return (
		(await tryFetchQuery(['fetchListing', id], () => fetchListing(id))) || {
			props: {
				id,
				dehydratedState: dehydrate(queryClient),
				accessToken: await fetchAccessToken(context),
			},
		}
	);
}

export default ListingDetailsPage;
