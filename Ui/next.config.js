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
