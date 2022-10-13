import { useLogin } from '@components/Header/hooks';
import { renderHook } from '@testing-library/react-hooks';
import { useRouter } from 'next/router';
import React from 'react';

jest.mock('next/router', () => ({
	...jest.requireActual('next/router'),
	useRouter: jest.fn(),
}));

describe('useLogin hook', () => {
	let route: string = '';

	beforeEach(() => (route = ''));

	(useRouter as unknown as jest.Mock).mockImplementation(() => ({
		route,
		push: jest.fn((value: string) => (route = value)),
		replace: jest.fn((value: string) => (route = value)),
	}));

	const { result } = renderHook(() => useLogin());

	describe('handleSignIn', () => {
		it('should redirect user to `/api/auth/login` when called', async () => {
			// Act
			result.current.handleSignIn();

			// Assert
			expect(route).toBe('/api/auth/login');
		});
	});

	describe('handleSignInWithReturnTo', () => {
		it('should redirect user to `/api/auth/login?returnTo=${returnTo}` when called', async () => {
			// Arrange
			const returnTo: string = 'test-page';

			// Act
			result.current.handleSignInWithReturnTo(returnTo);

			// Assert
			expect(route).toBe(`/api/auth/login?returnTo=${returnTo}`);
		});
	});

	describe('handleSignOut', () => {
		it('should redirect user to `/api/auth/logout` when called', async () => {
			// Act
			result.current.handleSignOut();

			// Assert
			expect(route).toBe('/api/auth/logout');
		});
	});
});
