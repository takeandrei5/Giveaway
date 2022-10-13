// jest.config.js
const nextJest = require('next/jest');

const createJestConfig = nextJest({
	// Provide the path to your Next.js app to load next.config.js and .env files in your test environment
	dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
	// Add more setup options before each test is run
	// if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work

	setupFiles: ['./jest.setup.js'],
	moduleDirectories: ['node_modules', '<rootDir>/src'],
	testEnvironment: 'jsdom',
	clearMocks: true,
	moduleNameMapper: {
		// WebApi Listings
		'^@api/webapi/listings/server-side': '<rootDir>/src/api/webapi/listings/server-side',
		'^@api/webapi/listings/client-side': '<rootDir>/src/api/webapi/listings/client-side',
		'^@api/webapi/listings/(.*)$': '<rootDir>/src/api/webapi/listings/$1',
		// WebApi Users
		'^@api/webapi/users/server-side': '<rootDir>/src/api/webapi/users/server-side',
		'^@api/webapi/users/(.*)$': '<rootDir>/src/api/webapi/users/$1',
		// ChatApi Users
		'^@api/chatapi/users/server-side': '<rootDir>/src/api/chatapi/users/server-side',
		// UI Components, Modules and Routes
		'^@components$': '<rootDir>/src/components',
		'^@components/(.*)$': '<rootDir>/src/components/$1',
		'^@layouts$': '<rootDir>/src/layouts',
		'^@modules$': '<rootDir>/src/modules',
		'^@modules/(.*)$': '<rootDir>/src/modules/$1',
		'^@redux/(.*)$': '<rootDir>/src/redux/$1',
		'^@routes/nextapi/listings$': '<rootDir>/src/routes/nextapi/listings',
		'^@routes/nextapi/users$': '<rootDir>/src/routes/nextapi/users',
		'^@routes/webapi/listings$': '<rootDir>/src/routes/webapi/listings',
		'^@routes/webapi/users$': '<rootDir>/src/routes/webapi/users',
		'^@pages/(.*)$': '<rootDir>/src/pages/$1',
		'^@utils/(.*)$': '<rootDir>/src/utils/$1',
		'^__tests__/(.*)$': '<rootDir>/__tests__/$1',
	},
	modulePathIgnorePatterns: [
		'<rootDir>/src/pages/', // Ignore pages folder for now
		'<rootDir>/src/utils/{axios,constants,enums,errors,mainTheme,queryClient,types}.ts',
		'<rootDir>/__tests__/wrappers.tsx',
		'<rootDir>/__tests__/constants.ts',
	],
	collectCoverageFrom: [
		'src/**/*.{ts,tsx}',
		'!src/**/{styles,types,constants}.ts',
		'!src/**/index.tsx',
		'!src/redux/**',
		'!src/utils/{axios,constants,enums,errors,mainTheme,queryClient,types}.ts',
	],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
