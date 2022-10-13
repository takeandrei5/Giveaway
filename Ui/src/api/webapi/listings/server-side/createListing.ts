import { getAccessToken } from '@auth0/nextjs-auth0';
import { CREATE_LISTING_URL } from '@routes/webapi/listings';
import { axiosInstance } from '@utils/axios';
import { NextApiRequest, NextApiResponse } from 'next';

const createListing = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
	const { accessToken } = await getAccessToken(req, res);

	await axiosInstance.post(CREATE_LISTING_URL, req.body, {
		headers: {
			Authorization: 'Bearer ' + accessToken,
		},
	});

	return res.json(200);
};

export default createListing;
