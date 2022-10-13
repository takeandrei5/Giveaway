import { UPDATE_LISTING_URL } from '@routes/nextapi/listings';
import { axiosInstance } from '@utils/axios';
import { NotFoundError } from '@utils/errors';
import { AxiosResponse } from 'axios';
import { UpdateListingRequest } from '../types';

const updateListing = async (id: string, data: UpdateListingRequest): Promise<void> => {
	const { status } = await axiosInstance.put<unknown, AxiosResponse<unknown>, UpdateListingRequest>(`${UPDATE_LISTING_URL}/${id}`, data);

	if (status === 400 || status === 404) {
		throw new NotFoundError(`Listing ${id} not found.`);
	}
};

export default updateListing;
