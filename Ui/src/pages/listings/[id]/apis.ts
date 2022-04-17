import { FetchListingDetailsResponse } from './types';

const fetchListing = async (id: string): Promise<FetchListingDetailsResponse | undefined> => {
	try {
		const baseUrl: string = process.env.NEXT_BACKEND_URL_SERVER!;
		const apiUrl = baseUrl + `/listings/${id}`;

		const response = await fetch(apiUrl, {
			method: 'GET',
		});

		const result: FetchListingDetailsResponse = await response.json();
		return result;
	} catch (err) {
		console.error('Fetch listing failed', err);
	}
};

export { fetchListing };
