import { FETCH_LISTINGS_URL } from '@routes/webapi/listings';
import { axiosInstance } from '@utils/axios';
import { checkArgumentForNullish } from '@utils/helpers';
import { PaginatedResult, SortingType } from '@utils/types';
import { AxiosResponse } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import { FetchListingsResponse, ItemData } from '../types';

const fetchListings = async (req: NextApiRequest, _: NextApiResponse): Promise<PaginatedResult<ItemData>> => {
	const pageNumber: number = +checkArgumentForNullish<string>(req.query?.pageNumber as string, 'Page number cannot be empty.');
	const pageSize: number = +checkArgumentForNullish<string>(req.query?.pageSize as string, 'Page size cannot be empty.');
	const orderBy: SortingType = checkArgumentForNullish(req.query?.orderBy as SortingType, 'Order by cannot be empty.');
	const filterByCategory: number | undefined = !!req.query?.filterByCategory ? +req.query?.filterByCategory : undefined;

	console.log(axiosInstance.defaults.baseURL);

	const { data }: AxiosResponse<FetchListingsResponse> = await axiosInstance.get<FetchListingsResponse>(FETCH_LISTINGS_URL, {
		params: {
			pageNumber,
			pageSize,
			orderBy,
			...(filterByCategory ? { filterByCategory } : {}),
		},
	});

	return data.listings;
};

export default fetchListings;
