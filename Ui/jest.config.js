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

	setupFilesAfterEnv: ['./jest.setup.js'],
	moduleDirectories: ['node_modules', '<rootDir>/src'],
	testEnvironment: 'jsdom',
	clearMocks: true,
	moduleNameMapper: {
		'^@api/(.*)$': '<rootDir>/src/api/$1',
		'^@components$': '<rootDir>/src/components',
		'^@components/(.*)$': '<rootDir>/src/components/$1',
		'^@layouts$': '<rootDir>/src/layouts',
		'^@modules$': '<rootDir>/src/modules',
		'^@modules/(.*)$': '<rootDir>/src/modules/$1',
		'^@redux/(.*)$': '<rootDir>/src/redux/$1',
		'^@pages/(.*)$': '<rootDir>/src/pages/$1',
		'^@utils/(.*)$': '<rootDir>/src/utils/$1',
	},
	modulePathIgnorePatterns: [
		'<rootDir>/src/pages/', // Ignore pages folder for now
		'<rootDir>/src/utils/{axios,constants,enums,errors,mainTheme,queryClient,types}.ts',
	],
	collectCoverageFrom: [
		'src/**/*.{ts,tsx}',
		'!src/**/{styles,types,constants}.ts',
		'!src/**/index.tsx',
		'!src/utils/{axios,constants,enums,errors,mainTheme,queryClient,types}.ts',
	],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
