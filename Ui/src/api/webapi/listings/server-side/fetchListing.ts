import { FETCH_LISTING_URL } from '@routes/webapi/listings';
import { axiosInstance } from '@utils/axios';
import { NotFoundError } from '@utils/errors';
import { AxiosResponse } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import { FetchListingDetailsResponse } from '../types';

const fetchListing = async (req: NextApiRequest, _: NextApiResponse): Promise<FetchListingDetailsResponse | undefined> => {
	const { id } = req.query;

	const { status, data }: AxiosResponse<FetchListingDetailsResponse | undefined> = await axiosInstance.get<
		FetchListingDetailsResponse | undefined
	>(`${FETCH_LISTING_URL}/${id}`);

	if (status === 400 || status === 404) {
		throw new NotFoundError(`Listing ${id} not found.`);
	}

	return data;
};

export default fetchListing;
