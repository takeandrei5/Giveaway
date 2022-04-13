import { ItemsDataI } from '../../modules/listings/interfaces';
import { PaginatedResult } from '../../utils/types';
import { FetchListingsResponse } from './interfaces';

const fetchListings = async (
	orderBy: string,
	filterByCategory: number | undefined = undefined
): Promise<PaginatedResult<ItemsDataI> | undefined> => {
	try {
		const orderByQuery = `?orderBy=${orderBy}`;
		const filterByCategoryQuery = filterByCategory ? `&filterByCategory=${filterByCategory}` : '';

		const baseUrl: string =
			process.env.NEXT_BACKEND_URL_SERVER || process.env.NEXT_PUBLIC_BACKEND_URL_CLIENT!;
		const apiUrl = baseUrl + `/listings${orderByQuery}${filterByCategoryQuery}`;

		const response = await fetch(apiUrl, {
			method: 'GET',
		});

		const result: FetchListingsResponse = await response.json();
		return result.listings;
	} catch (err) {
		console.error('Fetch listings failed', err);
	}
};

export { fetchListings };
