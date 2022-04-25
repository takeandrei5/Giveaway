import axiosInstance from '../../utils/axios';
import { NotFoundError } from '../../utils/errors';
import { FetchListingDetailsResponse } from './types';

const fetchListing = async (id: string): Promise<FetchListingDetailsResponse | undefined> => {
	const response = await axiosInstance.get(`listings/${id}`);

	if (response.status === 400 || response.status === 404) {
		throw new NotFoundError(`Listing ${id} not found.`);
	}

	const result: FetchListingDetailsResponse = await response.data;
	return result;
};

export default fetchListing;
