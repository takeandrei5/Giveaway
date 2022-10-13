import { fetchListings } from '@api/webapi/listings/server-side';
import { ItemData } from '@api/webapi/listings/types';
import { PaginatedResult } from '@utils/types';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	const data: PaginatedResult<ItemData> = await fetchListings(req, res);

	return res.status(200).json(data);
}
