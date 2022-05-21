import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import getConfig from 'next/config';

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

const axiosInstance: AxiosInstance = axios.create({
	baseURL: serverRuntimeConfig.apiUrl || publicRuntimeConfig.apiUrl,
	validateStatus: (status: number) => status < 500,
});

const axiosCdnInstance: AxiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_CDN_IMAGES_BASE_URL,
	headers: {
		Authorization: `Bearer ${process.env.NEXT_PUBLIC_CDN_ACCESS_TOKEN}`,
	},
});

export { axiosCdnInstance };

export default axiosInstance;
