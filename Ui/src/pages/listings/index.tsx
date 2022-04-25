import { NextPage, Redirect } from 'next/types';
import { dehydrate } from 'react-query';

import fetchListings from '../../api/listings/fetchListings';
import { ListingsModule } from '../../modules';
import { tryFetchQuery } from '../../utils/helpers';
import { queryClient } from '../../utils/queryClient';
import { dropdownOptions } from './constants';
import { ListingsPageProps } from './types';

const ListingsPage: NextPage<ListingsPageProps> = ({ options }: ListingsPageProps) => (
	<ListingsModule options={options} />
);

export async function getServerSideProps(): Promise<{ props: ListingsPageProps } | { redirect: Redirect }> {
	return (
		(await tryFetchQuery(['fetchListings'], () => fetchListings('Title ASC'))) || {
			props: {
				dehydratedState: dehydrate(queryClient),
				options: dropdownOptions,
			},
		}
	);
}

export default ListingsPage;
