import { axiosInstance } from '@utils/axios';

const createUser = async (accessToken: string): Promise<void> => {
	await axiosInstance.post('/', undefined, {
		headers: {
			Authorization: 'Bearer ' + accessToken,
		},
	});
};

export default createUser;
