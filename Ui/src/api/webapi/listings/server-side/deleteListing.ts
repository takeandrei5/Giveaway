import { getAccessToken } from '@auth0/nextjs-auth0';
import { DELETE_LISTING_URL } from '@routes/webapi/listings';
import { axiosInstance } from '@utils/axios';
import { NotFoundError } from '@utils/errors';
import { NextApiRequest, NextApiResponse } from 'next';

const deleteListing = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
	const { accessToken } = await getAccessToken(req, res);
	const { id } = req.query;

	const response = await axiosInstance.delete(`${DELETE_LISTING_URL}/${id}`, {
		headers: {
			Authorization: 'Bearer ' + accessToken,
		},
	});

	if (response.status === 400 || response.status === 404) {
		throw new NotFoundError(`Listing ${id} not found.`);
	}

	return res.json(200);
};

export default deleteListing;
