import { NextPage, Redirect } from 'next/types';
import { dehydrate } from 'react-query';

import { Skeleton } from '../../components';
import { ListingCategoryBox, ListingItems, ListingSortDropdown } from '../../modules';
import categories from '../../utils/constants/categoriesConstant';
import { queryClient } from '../../utils/queryClient';
import { SortingType } from '../../utils/types';
import { fetchListings } from './apis';
import { dropdownOptions } from './constants';
import useFetchListings from './hooks';
import { ListingsPageProps } from './types';

const ListingsPage: NextPage<ListingsPageProps> = ({ categories, options }: ListingsPageProps) => {
	const { isLoading, listings, setSort } = useFetchListings();

	return (
		<Skeleton borderRadius='2xl' isLoaded={!isLoading}>
			<ListingCategoryBox categories={categories} />
			<ListingSortDropdown options={options} onChangeHandler={(value: string) => setSort(value as SortingType)} />
			<ListingItems items={listings?.result || []} />
		</Skeleton>
	);
};

export async function getServerSideProps(): Promise<{ props: ListingsPageProps } | { redirect: Redirect }> {
	try {
		await queryClient.fetchQuery('fetchListings', () => fetchListings('Title ASC'));
	} catch (err) {
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
			categories,
			options: dropdownOptions,
		},
	};
}

export default ListingsPage;
