import { FETCH_LISTING_URL } from '@routes/nextapi/listings';
import { axiosInstance } from '@utils/axios';
import { NotFoundError } from '@utils/errors';
import { AxiosResponse } from 'axios';
import { FetchListingDetailsResponse } from '../types';

const fetchListing = async (id: string, signal: AbortSignal | undefined = undefined): Promise<FetchListingDetailsResponse | undefined> => {
	const { data, status }: AxiosResponse<FetchListingDetailsResponse | undefined> = await axiosInstance.get<
		FetchListingDetailsResponse | undefined
	>(`${FETCH_LISTING_URL}/${id}`, {
		signal,
	});

	if (status === 400 || status === 404) {
		throw new NotFoundError(`Listing ${id} not found.`);
	}

	return data;
};

export default fetchListing;
