import axios, { AxiosRequestConfig } from 'axios';
import { getToken } from 'next-auth/jwt';

const axiosInstance = axios.create({
	baseURL: process.env.BACKEND_URL,
});

axiosInstance.interceptors.request.use(
	async (config: AxiosRequestConfig) => {
		const token = await getToken();
		console.log('zz', token);
		if (token) config.headers!['Authorization'] = 'Bearer ' + token;

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
			// NextResponse.rewrite('/not-found');
		}

		return Promise.reject(error);
	}
);

export default axiosInstance;
