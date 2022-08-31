import { fetchListings } from '@api/listings';
import { ListingsModule } from '@modules';
import { DEFAULT_PAGINATION_OPTIONS } from '@utils/constants';
import { tryFetchQuery } from '@utils/helpers';
import queryClient from '@utils/queryClient';
import { NextPage, Redirect } from 'next/types';
import { useLayoutEffect } from 'react';
import { dehydrate } from 'react-query';

import { dropdownOptions } from './constants';
import { ListingsPageProps } from './types';

const ListingsPage: NextPage<ListingsPageProps> = ({ options }: ListingsPageProps) => {
	useLayoutEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return <ListingsModule options={options} />;
};

export async function getStaticProps(): Promise<
	{ props: ListingsPageProps; revalidate: number } | { redirect: Redirect }
> {
	console.log('hello');

	return (
		(await tryFetchQuery(['fetchListings'], () =>
			fetchListings(DEFAULT_PAGINATION_OPTIONS.pageNumber, DEFAULT_PAGINATION_OPTIONS.pageSize, 'Title ASC')
		)) || {
			props: {
				dehydratedState: dehydrate(queryClient),
				options: dropdownOptions,
			},
			revalidate: 300,
		}
	);
}

export default ListingsPage;
