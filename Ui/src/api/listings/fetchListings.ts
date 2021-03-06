import { AxiosResponse } from 'axios';

import axiosInstance from '../../utils/axios';
import { PaginatedResult, SortingType } from '../../utils/types';
import { FetchListingsResponse, ItemData } from './types';

const fetchListings = async (
	pageNumber: number,
	pageSize: number,
	orderBy: SortingType,
	filterByCategory: number | undefined = undefined
): Promise<PaginatedResult<ItemData>> => {
	const response: AxiosResponse = await axiosInstance.get('/listings', {
		params: {
			pageNumber,
			pageSize,
			orderBy,
			...(filterByCategory ? { filterByCategory } : {}),
		},
	});

	const result: FetchListingsResponse = response.data;
	return result.listings;
};

export default fetchListings;
