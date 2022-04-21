import { AxiosResponse } from 'axios';
import { ItemData } from '../../modules/listings/types';
import axiosInstance from '../../utils/axios';
import { PaginatedResult, SortingType } from '../../utils/types';
import { FetchListingsResponse } from './types';

const fetchListings = async (
	orderBy: SortingType,
	filterByCategory: number | undefined = undefined
): Promise<PaginatedResult<ItemData> | undefined> => {
	try {
		const response: AxiosResponse = await axiosInstance.get('/listings', {
			params: {
				orderBy,
				...(filterByCategory ? { filterByCategory } : {}),
			},
		});

		const result: FetchListingsResponse = await response.data;
		return result.listings;
	} catch (err) {
		console.error('Fetch listings failed', err);
	}
};

export { fetchListings };
