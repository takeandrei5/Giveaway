import { useAuth0 } from '@auth0/auth0-react';
import { useUser } from '@auth0/nextjs-auth0';
import { renderHook } from '@testing-library/react-hooks';
import { useGetAccessToken } from '@utils/hooks';
import { QueryClientWrapper } from '__tests__/wrappers';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

jest.mock('@auth0/nextjs-auth0', () => ({ ...jest.requireActual('@auth0/nextjs-auth0'), useUser: jest.fn() }));
jest.mock('@auth0/auth0-react', () => ({ ...jest.requireActual('@auth0/auth0-react'), useAuth0: jest.fn() }));
jest.mock('next/router', () => ({
	...jest.requireActual('next/router'),
	useRouter: jest.fn(),
}));

jest.mock('react-query', () => ({
	...jest.requireActual('react-query'),
	useQuery: jest.fn(),
}));

describe('useGetAccessToken', () => {
	let route: string = '';

	beforeEach(() => {
		route = '';
	});

	(useRouter as unknown as jest.Mock).mockImplementation(() => ({
		route,
		replace: jest.fn((value: string) => (route = value)),
	}));

	describe('useEffect', () => {
		(useAuth0 as unknown as jest.Mock).mockImplementation(() => ({
			getAccessTokenSilently: jest.fn,
		}));

		(useUser as unknown as jest.Mock).mockImplementation(() => ({ user: undefined, isLoading: false }));
		(useQuery as unknown as jest.Mock).mockImplementation(([query, options], f) => f());

		it('should not redirect user if `enableRedirect` is false', () => {
			// Arrange
			const redirectTo: string = '/test';

			// Act
			renderHook(() => useGetAccessToken(redirectTo, false));

			// Assert
			expect(route).toBe('');
		});

		it('should redirect user to `redirectTo` argument if there is no user and isLoading is falsy', () => {
			// Arrange
			const redirectTo: string = '/test';

			// Act
			renderHook(() => useGetAccessToken(redirectTo, true));

			// Assert
			expect(route).toBe(redirectTo);
		});
	});

	it('should redirect user to `/listings` if useQuery fails', async () => {
		// Arrange
		(useAuth0 as unknown as jest.Mock).mockImplementation(() => ({
			getAccessTokenSilently: jest.fn(() => Promise.reject()),
		}));

		(useUser as unknown as jest.Mock).mockImplementation(() => ({ user: { name: 'John Doe' }, isLoading: false }));
		(useQuery as unknown as jest.Mock).mockImplementation(jest.requireActual('react-query').useQuery);

		// Act
		const { result, waitForNextUpdate } = renderHook(() => useGetAccessToken(), { wrapper: QueryClientWrapper });

		await waitForNextUpdate();

		// Assert
		expect(result.current.isFetched).toBe(true);
		expect(route).toBe('/listings');
	});
});
