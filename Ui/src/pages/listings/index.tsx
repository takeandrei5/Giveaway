import { NextPage } from 'next/types';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import { Skeleton } from '../../components';
import { ListingCategoryBox, ListingItems, ListingSortDropdown } from '../../modules';
import { ItemsDataI } from '../../modules/listings/interfaces';
import { useAppSelector } from '../../redux/hooks';
import categories from '../../utils/constants/categoriesConstant';
import { PaginatedResult } from '../../utils/types';
import { fetchListings } from './apis';
import { categoryDictionary, dropdownOptions } from './constants';
import { ListingsPageI } from './interfaces';

const ListingsPage: NextPage<ListingsPageI> = ({ categories, listings, options }: ListingsPageI) => {
	const [sort, setSort] = useState<string>('Title');
	const [listingItems, setListingItems] = useState<ItemsDataI[]>(listings.result);

	const categoryState = useAppSelector((state) => state.changeCategory);

	const { isLoading, refetch } = useQuery(
		['fetchSortedListings', sort],
		() => fetchListings(sort, categoryDictionary[categoryState.category!]),
		{
			initialData: listings,
			onSuccess: (data: PaginatedResult<ItemsDataI> | undefined) => {
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

export async function getServerSideProps(): Promise<{ props: ListingsPageI }> {
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
