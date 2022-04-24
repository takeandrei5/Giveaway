import axiosInstance from '../../utils/axios';
import { NotFoundError } from '../../utils/errors';

const deleteListing = async (id: string, accessToken: string): Promise<void> => {
	const response = await axiosInstance.delete(`listings/${id}`, {
		headers: {
			Authorization: 'Bearer ' + accessToken,
		},
	});

	if (response.status === 400 || response.status === 404) {
		throw new NotFoundError('Listing not found');
	}
};

export { deleteListing };
