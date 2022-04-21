const nextConfig = {
	webpackDevMiddleware: (config) => {
		config.watchOptions = {
			poll: 800,
			aggregateTimeout: 300,
		};
		return config;
	},
	reactStrictMode: true,
	optimizeFonts: true,
	serverRuntimeConfig: {
		apiUrl: process.env.NEXT_BACKEND_URL_SERVER,
	},
	publicRuntimeConfig: {
		apiUrl: process.env.NEXT_PUBLIC_BACKEND_URL_CLIENT,
	},
};

module.exports = nextConfig;
