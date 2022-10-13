import { fetchListing } from '@api/webapi/listings/client-side';
import { tryFetchQuery } from '@utils/helpers';
import queryClient from '@utils/queryClient';
import { GetServerSidePropsContext, Redirect } from 'next';
import { dehydrate, QueryFunctionContext } from 'react-query';

import { ListingDetailsPageProps } from './types';

const getListingDetailsServerSideProps = async (
	context: GetServerSidePropsContext
): Promise<{ props: ListingDetailsPageProps } | { redirect: Redirect }> => {
	const id: string = context.params?.id as string;

	return (
		(await tryFetchQuery(['fetchListing', id], ({ signal }: QueryFunctionContext<string[], unknown>) => fetchListing(id, signal))) || {
			props: {
				id,
				dehydratedState: dehydrate(queryClient),
			},
		}
	);
};

export { getListingDetailsServerSideProps };
