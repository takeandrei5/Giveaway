import { FetchListingDetailsResponse } from './types';

const fetchListing = async (id: string): Promise<FetchListingDetailsResponse | undefined> => {
	try {
		const baseUrl: string = process.env.NEXT_BACKEND_URL_SERVER!;
		const apiUrl = baseUrl + `/listings/${id}`;

		const response = await fetch(apiUrl, {
			method: 'GET',
		});

		if (!response.ok && (response.status === 400 || response.status === 404)) {
			return undefined;
		}

		const result: FetchListingDetailsResponse = await response.json();
		return result;
	} catch (err) {
		console.error('Fetch listing failed', err);
	}
};

const deleteListing = async (id: string, accessToken: string): Promise<void> => {
	try {
		const baseUrl: string = process.env.NEXT_PUBLIC_BACKEND_URL_CLIENT!;
		const apiUrl = baseUrl + `/listings/${id}`;
		const response = await fetch(apiUrl, {
			method: 'DELETE',
			headers: {
				Authorization: 'Bearer ' + accessToken,
			},
		});

		if (!response.ok && (response.status === 400 || response.status === 404)) {
			throw new Error('Delete listing failed');
		}
	} catch (err) {
		console.error('Fetch listing failed', err);
	}
};

export { deleteListing, fetchListing };
