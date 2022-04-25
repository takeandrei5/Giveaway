import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import fetchListings from '../../api/listings/fetchListings';
import { categoryDictionary } from '../../pages/listings/constants';
import { useAppSelector } from '../../redux/hooks';
import { CategoryState } from '../../redux/slices/changeCategorySlice';
import { SortingType } from '../../utils/types';

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
	}, [sort, categoryState]);

	return { isLoading, listings, sort, setSort };
};

export default useFetchListings;
