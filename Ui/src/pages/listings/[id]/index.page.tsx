import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import { fetchListing } from '@api/listings';
import { FetchListingsResponse, ItemData } from '@api/listings/types';
import { ListingDetailsModule } from '@modules';
import axiosInstance from '@utils/axios';
import { tryFetchQuery } from '@utils/helpers';
import queryClient from '@utils/queryClient';
import { PaginatedResult } from '@utils/types';
import { AxiosResponse } from 'axios';
import { GetStaticPropsContext } from 'next';
import { NextPage, Redirect } from 'next/types';
import { dehydrate } from 'react-query';

import { ListingDetailsPageProps } from './types';

const ListingDetailsPage: NextPage<ListingDetailsPageProps> = ({ id }: ListingDetailsPageProps) => (
	<ListingDetailsModule id={id} />
);

export async function getStaticProps(
	context: GetStaticPropsContext
): Promise<{ props: ListingDetailsPageProps; revalidate: number } | { redirect: Redirect }> {
	const id: string = context.params?.id as string;

	return (
		(await tryFetchQuery(['fetchListing', id], () => fetchListing(id))) || {
			props: {
				id,
				dehydratedState: dehydrate(queryClient),
			},
			revalidate: 600,
		}
	);
}

export async function getStaticPaths() {
	const fetchListings = async (): Promise<PaginatedResult<ItemData>> => {
		const response: AxiosResponse = await axiosInstance.get('/listings', {
			params: {
				orderBy: 'Title ASC',
			},
		});

		const result: FetchListingsResponse = await response.data;
		return result.listings;
	};
	const listings = await queryClient.fetchQuery(['fetchListings'], () => fetchListings());

	const paths = listings?.result.map((listing: ItemData) => ({
		params: { id: listing.id },
	}));

	return { paths, fallback: 'blocking' };
}

export default ListingDetailsPage;
