import { NextPage, Redirect } from 'next/types';
import { dehydrate } from 'react-query';

import fetchListings from '../../api/listings/fetchListings';
import { ListingsModule } from '../../modules';
import { queryClient } from '../../utils/queryClient';
import { dropdownOptions } from './constants';
import { ListingsPageProps } from './types';

const ListingsPage: NextPage<ListingsPageProps> = ({ options }: ListingsPageProps) => (
	<ListingsModule options={options} />
);

export async function getServerSideProps(): Promise<{ props: ListingsPageProps } | { redirect: Redirect }> {
	try {
		await queryClient.fetchQuery('fetchListings', () => fetchListings('Title ASC'));
	} catch (err) {
		console.error('Fetch listings failed', err);

		return {
			redirect: {
				permanent: false,
				destination: '500',
			},
		};
	}

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
			options: dropdownOptions,
		},
	};
}

export default ListingsPage;
