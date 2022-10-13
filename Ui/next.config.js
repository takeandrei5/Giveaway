const nextConfig = {
	images: {
		domains: ['imagedelivery.net'],
	},
	webpack: (config, { dev }) => {
		config.module.rules.push({
			test: /\.spec.tsx$/,
			loader: 'ignore-loader',
		});

		config.module.rules.push({
			test: /.coverage./,
			loader: 'ignore-loader',
		});

		config.module.rules.push({
			test: /.jest./,
			loader: 'ignore-loader',
		});
		return config;
	},
	webpackDevMiddleware: (config) => {
		config.watchOptions = {
			poll: 1000,
			aggregateTimeout: 300,
		};
		return config;
	},
	swcMinify: true,
	experimental: {
		swcPlugins: [['next-superjson-plugin', {}]],
	},
	reactStrictMode: false,
	optimizeFonts: true,
	serverRuntimeConfig: {
		baseURL: process.env.NEXT_SERVER_URL,
	},
	publicRuntimeConfig: {
		baseURL: process.env.NEXT_CLIENT_URL,
	},
	pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
};

module.exports = nextConfig;
