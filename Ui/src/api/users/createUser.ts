import axiosInstance from '../../utils/axios';

const createUser = async (accessToken: string): Promise<void | undefined> => {
	await axiosInstance.post(
		'/users',
		{},
		{
			headers: {
				Authorization: 'Bearer ' + accessToken,
			},
		}
	);
};

export default createUser;
