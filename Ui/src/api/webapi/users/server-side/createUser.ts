import { CREATE_USER_URL } from '@routes/webapi/users';
import { axiosInstance } from '@utils/axios';

const createUser = async (accessToken: string): Promise<void> => {
	await axiosInstance.post(
		CREATE_USER_URL,
		{},
		{
			headers: {
				Authorization: 'Bearer ' + accessToken,
			},
		}
	);
};

export default createUser;
