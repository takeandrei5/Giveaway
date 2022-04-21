import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import { useAppSelector } from '../../redux/hooks';
import { CategoryState } from '../../redux/slices/changeCategorySlice';
import { SortingType } from '../../utils/types';
import { fetchListings } from './apis';
import { categoryDictionary } from './constants';

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

	return { isLoading, listings, setSort };
};

export default useFetchListings;
