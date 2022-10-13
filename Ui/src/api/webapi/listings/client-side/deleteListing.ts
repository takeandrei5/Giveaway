import { DELETE_LISTING_URL } from '@routes/nextapi/listings';
import { axiosInstance } from '@utils/axios';
import { NotFoundError } from '@utils/errors';
import { AxiosResponse } from 'axios';

const deleteListing = async (id: string): Promise<void> => {
	const { status } = await axiosInstance.delete<unknown, AxiosResponse<unknown>, unknown>(`${DELETE_LISTING_URL}/${id}`);

	if (status === 400 || status === 404) {
		throw new NotFoundError(`Listing ${id} not found.`);
	}
};

export default deleteListing;
