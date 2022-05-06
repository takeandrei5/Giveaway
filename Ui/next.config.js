const nextConfig = {
	images: {
		domains: ['imagedelivery.net'],
	},
	webpackDevMiddleware: (config) => {
		config.watchOptions = {
			poll: 800,
			aggregateTimeout: 300,
		};
		return config;
	},
	reactStrictMode: false,
	optimizeFonts: true,
	serverRuntimeConfig: {
		apiUrl: process.env.NEXT_BACKEND_URL_SERVER,
	},
	publicRuntimeConfig: {
		apiUrl: process.env.NEXT_PUBLIC_BACKEND_URL_CLIENT,
	},
	pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
};

module.exports = nextConfig;
