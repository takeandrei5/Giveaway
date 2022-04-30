import { fetchListings } from 'api/listings';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useAppSelector } from 'redux/hooks';
import { CategoryState } from 'redux/slices/changeCategorySlice';
import { SortingType } from 'utils/types';

import { categoryDictionary } from '../../pages/listings/constants';

const useFetchListings = () => {
	const [sort, setSort] = useState<SortingType>('Title ASC');
	const categoryState: CategoryState = useAppSelector((state) => state.changeCategory);

	const {
		isLoading,
		refetch: refetchListings,
		data: listings,
	} = useQuery('fetchListings', () => fetchListings(sort, categoryDictionary[categoryState.category!]));

	useEffect(() => {
		refetchListings();
	}, [sort, categoryState, refetchListings]);

	return { isLoading, listings, sort, setSort };
};

export default useFetchListings;
