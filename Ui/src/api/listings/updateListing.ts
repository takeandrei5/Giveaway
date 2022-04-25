import axiosInstance from '../../utils/axios';
import { UpdateListingRequest } from './types';

const updateListing = async (accessToken: string, data: UpdateListingRequest): Promise<void> =>
	await axiosInstance.put('/listings', data, {
		headers: {
			Authorization: 'Bearer ' + accessToken,
		},
	});
export default updateListing;
