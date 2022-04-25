import axiosInstance from '../../utils/axios';
import { NotFoundError } from '../../utils/errors';
import { UpdateListingRequest } from './types';

const updateListing = async (accessToken: string, id: string, data: UpdateListingRequest): Promise<void> => {
	const response = await axiosInstance.put(`/listings/${id}`, data, {
		headers: {
			Authorization: 'Bearer ' + accessToken,
		},
	});

	if (response.status === 400 || response.status === 404) {
		throw new NotFoundError(`Listing ${id} not found.`);
	}
};
export default updateListing;
