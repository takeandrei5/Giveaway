import { fetchListings } from 'api/listings';
import { ItemData } from 'api/listings/types';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { useAppSelector } from 'redux/hooks';
import { CategoryState } from 'redux/slices/changeCategorySlice';
import { DEFAULT_PAGINATION_OPTIONS } from 'utils/constants';
import { PaginatedResult, PaginationOptions, SortingType } from 'utils/types';

import { categoryDictionary } from '../../pages/listings/constants';

const useInfiniteFetchListings = () => {
	const paginationOptionsRef: MutableRefObject<PaginationOptions> = useRef<PaginationOptions>({
		...DEFAULT_PAGINATION_OPTIONS,
	});
	const [sort, setSort] = useState<SortingType>('Title ASC');
	const [totalData, setTotalData] = useState<ItemData[]>([]);
	const categoryState: CategoryState = useAppSelector((state) => state.changeCategory);

	const {
		isLoading,
		data: nextData,
		refetch: refetchListings,
	} = useQuery(
		['fetchListings'],
		() =>
			fetchListings(
				paginationOptionsRef.current.pageNumber,
				paginationOptionsRef.current.pageSize,
				sort,
				categoryDictionary[categoryState.category!]
			),
		{
			onSuccess: (data: PaginatedResult<ItemData> | undefined) => {
				if (data) {
					setTotalData((oldListings: ItemData[]) => [...oldListings, ...data.result]);
				}

				paginationOptionsRef.current.pageNumber++;
			},
		}
	);

	useEffect(() => {
		refetchListings();
	}, [sort, categoryState, refetchListings]);

	return { isLoading, totalData, nextData, sort, setSort, refetchListings };
};

export default useInfiniteFetchListings;
