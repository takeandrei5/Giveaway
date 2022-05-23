import axios, { AxiosInstance, AxiosResponse } from 'axios';
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

axiosInstance.interceptors.response.use((response: AxiosResponse) => {
	handleDates(response.data);
	return response;
});

function isIsoDateString(value: unknown): boolean {
	const isoDateFormat: RegExp = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d*)?(?:[-+]\d{2}:?\d{2}|Z)?$/;

	return !!value && typeof value === 'string' && isoDateFormat.test(value);
}

export function handleDates(body: any): void {
	if (!body || typeof body !== 'object') return;

	for (const key of Object.keys(body)) {
		const value = body[key];
		if (isIsoDateString(value)) {
			body[key] = new Date(value as string);
			continue;
		}

		if (typeof value === 'object') handleDates(value);
	}
}

export { axiosCdnInstance };

export default axiosInstance;
