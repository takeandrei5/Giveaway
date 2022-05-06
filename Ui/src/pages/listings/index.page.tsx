import fetchListings from 'api/listings/fetchListings';
import { ListingsModule } from 'modules';
import { NextPage, Redirect } from 'next/types';
import { dehydrate } from 'react-query';
import { DEFAULT_PAGINATION_OPTIONS } from 'utils/constants';
import { tryFetchQuery } from 'utils/helpers';
import queryClient from 'utils/queryClient';
import { PaginationOptions } from 'utils/types';

import { dropdownOptions } from './constants';
import { ListingsPageProps } from './types';

const ListingsPage: NextPage<ListingsPageProps> = ({ options }: ListingsPageProps) => (
	<ListingsModule options={options} />
);

export async function getStaticProps(): Promise<
	{ props: ListingsPageProps; revalidate: number } | { redirect: Redirect }
> {
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
