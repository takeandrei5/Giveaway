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
};

module.exports = nextConfig;
