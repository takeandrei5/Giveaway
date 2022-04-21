import axios, { AxiosInstance } from 'axios';
import getConfig from 'next/config';

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

const axiosInstance: AxiosInstance = axios.create({
	baseURL: serverRuntimeConfig.apiUrl || publicRuntimeConfig.apiUrl,
});

export default axiosInstance;
