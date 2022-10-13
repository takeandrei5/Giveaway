import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import { getServerSidePropsWrapper } from '@auth0/nextjs-auth0';
import { ListingDetailsModule } from '@modules';
import { NextPage } from 'next/types';
import { useLayoutEffect } from 'react';

import { ListingDetailsPageProps } from './types';
import { getListingDetailsServerSideProps } from './utils';

const ListingDetailsPage: NextPage<ListingDetailsPageProps> = ({ id }: ListingDetailsPageProps) => {
	useLayoutEffect(() => {
		window.scrollTo(0, document.getElementById('header')!.getBoundingClientRect().height);
	}, []);

	return <ListingDetailsModule id={id} />;
};

export const getServerSideProps = getServerSidePropsWrapper(getListingDetailsServerSideProps);

// export async function getStaticPaths() {
// 	const fetchListings = async (): Promise<PaginatedResult<ItemData>> => {
// 		const response: AxiosResponse = await axiosInstance.get('/listings', {
// 			params: {
// 				orderBy: 'Title ASC',
// 			},
// 		});

// 		const result: FetchListingsResponse = await response.data;
// 		return result.listings;
// 	};
// 	const listings = await queryClient.fetchQuery(['fetchListings'], () => fetchListings());

// 	const paths = listings?.result.map((listing: ItemData) => ({
// 		params: { id: listing.id },
// 	}));

// 	return { paths, fallback: 'blocking' };
// }

export default ListingDetailsPage;
