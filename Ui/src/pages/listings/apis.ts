import { AxiosResponse } from 'axios';

import { ItemData } from '../../modules/listings/ItemsList/types';
import axiosInstance from '../../utils/axios';
import { PaginatedResult } from '../../utils/types';
import { FetchListingsResponse } from './types';

const fetchListings = async (): Promise<PaginatedResult<ItemData> | undefined> => {
	try {
		const response: AxiosResponse = await axiosInstance.get('/listings', {
			params: {
				orderBy: 'Title ASC',
			},
		});

		const result: FetchListingsResponse = await response.data;
		return result.listings;
	} catch (err) {
		console.error('Fetch listings failed', err);
	}
};

export { fetchListings };
