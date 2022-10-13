import { CREATE_LISTING_URL } from '@routes/nextapi/listings';
import { axiosInstance } from '@utils/axios';
import { AxiosResponse } from 'axios';

import { CreateListingRequest } from '../types';

const createListing = async (data: CreateListingRequest): Promise<void> => {
	await axiosInstance.post<unknown, AxiosResponse<unknown>, CreateListingRequest>(CREATE_LISTING_URL, data);
};

export default createListing;
