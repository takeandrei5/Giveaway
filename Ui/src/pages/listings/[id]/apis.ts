import { FetchListingDetailsResponse } from './types';
import axiosInstance from '../../../utils/axios';
import { NotFoundError } from '../../../utils/errors';

const fetchListing = async (id: string): Promise<FetchListingDetailsResponse | undefined> => {
	const response = await axiosInstance.get(`listings/${id}`);

	if (response.status === 400 || response.status === 404) {
		throw new NotFoundError('Listing not found');
	}

	const result: FetchListingDetailsResponse = await response.data;
	return result;
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
