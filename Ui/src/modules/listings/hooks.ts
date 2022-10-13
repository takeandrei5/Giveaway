import { fetchListings } from '@api/webapi/listings/client-side';
import { ItemData } from '@api/webapi/listings/types';
import { categoryDictionary } from '@pages/listings/constants';
import { useAppSelector } from '@redux/hooks';
import { CategoryState } from '@redux/slices/changeCategorySlice';
import { DEFAULT_PAGINATION_OPTIONS } from '@utils/constants';
import { PaginatedResult, PaginationOptions, SortingType } from '@utils/types';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { QueryFunctionContext, useQuery } from 'react-query';

import { UseInfiniteFetchListingsResult } from './types';

const useInfiniteFetchListings = (): UseInfiniteFetchListingsResult => {
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
		[`fetchListings${categoryDictionary[categoryState.category!] || ''}`],
		({ signal }: QueryFunctionContext<string[], unknown>) =>
			fetchListings(
				paginationOptionsRef.current.pageNumber,
				paginationOptionsRef.current.pageSize,
				sort,
				categoryDictionary[categoryState.category!],
				signal
			),
		{
			onSuccess: (data: PaginatedResult<ItemData>) => {
				setTotalData((oldListings: ItemData[]) => [...oldListings, ...data.result]);
				paginationOptionsRef.current.pageNumber++;
			},
			enabled: false,
		}
	);

	const reset = (): void => {
		paginationOptionsRef.current.pageNumber = DEFAULT_PAGINATION_OPTIONS.pageNumber;
		setTotalData([]);
	};

	const handleSortingDropdownChange = (value: string): void => setSort(value as SortingType);

	useEffect(() => {
		reset();
	}, [categoryState]);

	useEffect(() => {
		refetchListings();
	}, [sort, categoryState, refetchListings]);

	return { handleSortingDropdownChange, isLoading, nextData, refetchListings, sort, totalData };
};

export { useInfiniteFetchListings };
