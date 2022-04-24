import axiosInstance from '../../../utils/axios';
import { NotFoundError } from '../../../utils/errors';
import { FetchListingDetailsResponse } from './types';

const fetchListing = async (id: string): Promise<FetchListingDetailsResponse | undefined> => {
	const response = await axiosInstance.get(`listings/${id}`);

	if (response.status === 400 || response.status === 404) {
		throw new NotFoundError('Listing not found');
	}

	const result: FetchListingDetailsResponse = await response.data;
	return result;
};

const deleteListing = async (id: string, accessToken: string): Promise<void> => {
	const response = await axiosInstance.delete(`listings/${id}`, {
		headers: {
			Authorization: accessToken,
		},
	});

	if (response.status === 400 || response.status === 404) {
		throw new NotFoundError('Listing not found');
	}
};

export { deleteListing, fetchListing };
