import { fetchListing } from '@api/webapi/listings/server-side';
import { FetchListingDetailsResponse } from '@api/webapi/listings/types';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	const data: FetchListingDetailsResponse | undefined = await fetchListing(req, res);

	return res.status(200).json(data);
}
