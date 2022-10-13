import { FETCH_LISTINGS_URL } from '@routes/nextapi/listings';
import { axiosInstance } from '@utils/axios';
import { PaginatedResult, SortingType } from '@utils/types';
import { AxiosResponse } from 'axios';

import { ItemData } from '../types';

const fetchListings = async (
	pageNumber: number,
	pageSize: number,
	orderBy: SortingType,
	filterByCategory: number | undefined = undefined,
	signal: AbortSignal | undefined = undefined
): Promise<PaginatedResult<ItemData>> => {
	const { data }: AxiosResponse<PaginatedResult<ItemData>> = await axiosInstance.get<PaginatedResult<ItemData>>(FETCH_LISTINGS_URL, {
		params: {
			pageNumber,
			pageSize,
			orderBy,
			filterByCategory,
		},
		signal,
	});

	return data;
};

export default fetchListings;
