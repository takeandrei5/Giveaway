import { AxiosResponse } from 'axios';

import axiosInstance from '../../utils/axios';
import { PaginatedResult, SortingType } from '../../utils/types';
import { FetchListingsResponse, ItemData } from './types';

const fetchListings = async (
	orderBy: SortingType,
	filterByCategory: number | undefined = undefined
): Promise<PaginatedResult<ItemData> | undefined> => {
	const response: AxiosResponse = await axiosInstance.get('/listings', {
		params: {
			orderBy,
			...(filterByCategory ? { filterByCategory } : {}),
		},
	});

	const result: FetchListingsResponse = await response.data;
	return result.listings;
};

export default fetchListings;
