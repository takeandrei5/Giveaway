import { handleAuth, handleCallback, Session } from '@auth0/nextjs-auth0';
import { AxiosRequestConfig } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import axiosInstance from '../../../utils/axios';

const afterCallback = async (
	req: NextApiRequest,
	res: NextApiResponse,
	session: Session,
	state: { [key: string]: any }
) => {
	axiosInstance.interceptors.request.use(
		async (config: AxiosRequestConfig) => {
			config.headers!['Authorization'] = 'Bearer ' + session.accessToken;

			return config;
		},
		(error) => {
			Promise.reject(error);
		}
	);

	axiosInstance.interceptors.response.use(
		(response) => response,
		async (error) => {
			if (error.response.status === 400 || error.response.status === 404) {
				res.redirect('/not-found');
			}

			return Promise.reject(error);
		}
	);

	await axiosInstance.post('/users');

	return session;
};

export default handleAuth({
	async callback(req: NextApiRequest, res: NextApiResponse) {
		try {
			await handleCallback(req, res, { afterCallback });
		} catch (error) {
			console.error(error);
		}
	},
});
