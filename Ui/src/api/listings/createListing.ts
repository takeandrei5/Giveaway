import axiosInstance from '@utils/axios';
import { CreateListingRequest } from './types';

const createListing = async (accessToken: string, data: CreateListingRequest): Promise<void> => {
	await axiosInstance.post('/listings', data, {
		headers: {
			Authorization: 'Bearer ' + accessToken,
		},
	});
};

export default createListing;
