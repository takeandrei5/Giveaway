import { NextPage } from 'next/types';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import { Skeleton } from '../../components';
import { ListingCategoryBox, ListingItems, ListingSortDropdown } from '../../modules';
import { ItemData } from '../../modules/listings/types';
import { useAppSelector } from '../../redux/hooks';
import categories from '../../utils/constants/categoriesConstant';
import { PaginatedResult } from '../../utils/types';
import { fetchListings } from './apis';
import { categoryDictionary, dropdownOptions } from './constants';
import { ListingsPageProps } from './interfaces';

const ListingsPage: NextPage<ListingsPageProps> = ({ categories, listings, options }: ListingsPageProps) => {
	const [sort, setSort] = useState<string>('Title');
	const [listingItems, setListingItems] = useState<ItemData[]>(listings.result);

	const categoryState = useAppSelector((state) => state.changeCategory);

	const { isLoading, refetch } = useQuery(
		['fetchSortedListings', sort],
		() => fetchListings(sort, categoryDictionary[categoryState.category!]),
		{
			initialData: listings,
			onSuccess: (data: PaginatedResult<ItemData> | undefined) => {
				if (data) {
					setListingItems(data.result);
				}
			},
		}
	);

	useEffect(() => {
		refetch();
	}, [sort, categoryState]);

	return (
		<>
			<Skeleton borderRadius='2xl' isLoaded={!isLoading}>
				<ListingCategoryBox categories={categories} />
				<ListingSortDropdown options={options} onChangeHandler={setSort} />
				<ListingItems items={listingItems} />
			</Skeleton>
		</>
	);
};

export async function getServerSideProps(): Promise<{ props: ListingsPageProps }> {
	const listings = await fetchListings('Title');

	return {
		props: {
			categories,
			listings: listings!,
			options: dropdownOptions,
		},
	};
}

export default ListingsPage;
