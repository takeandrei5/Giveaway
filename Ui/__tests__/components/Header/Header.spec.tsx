import { UserProvider, useUser } from '@auth0/nextjs-auth0';
import { ChakraProvider, useColorMode } from '@chakra-ui/react';
import { Header } from '@components';
import { useLogin } from '@components/Header/hooks';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/router';

jest.mock('@chakra-ui/react', () => ({ ...jest.requireActual('@chakra-ui/react'), useColorMode: jest.fn() }));
jest.mock('@auth0/nextjs-auth0', () => ({ ...jest.requireActual('@auth0/nextjs-auth0'), useUser: jest.fn() }));
jest.mock('next/router', () => ({
	...jest.requireActual('next/router'),
	useRouter: jest.fn(),
}));
jest.mock('@components/Header/hooks', () => ({
	...jest.requireActual('@components/Header/hooks'),
	useLogin: jest.fn(),
}));

const renderHeader = () => {
	return (
		<UserProvider>
			<ChakraProvider>
				<Header />
			</ChakraProvider>
		</UserProvider>
	);
};

describe('Header', () => {
	it('should match snapshot', () => {
		// Arrange
		(useColorMode as unknown as jest.Mock).mockImplementation(() => ({ colorMode: 'light' }));
		(useUser as unknown as jest.Mock).mockImplementation(() => ({ user: undefined }));
		(useLogin as unknown as jest.Mock).mockImplementation(() => ({
			handleSignIn: jest.fn(),
		}));

		// Act
		const { container } = render(renderHeader());

		// Assert
		expect(container).toMatchSnapshot();
	});

	it('should navigate user to `/listings` page when the logo is clicked', async () => {
		// Arrange
		let route = '';

		(useRouter as unknown as jest.Mock).mockImplementation(() => ({
			route,
			push: jest.fn((value: string) => (route = value)),
		}));

		// Act
		const { getByTestId } = render(renderHeader());
		await userEvent.click(getByTestId('logo-icon'));

		// Assert
		expect(route).toBe('/listings');
	});

	// describe('color mode', () => {
	// 	describe('when is dark mode the toggle-color-mode-button', () => {
	// 		it('should be a sun icon', () => {
	// 			// Arrange
	// 			(useColorMode as unknown as jest.Mock).mockImplementation(() => ({
	// 				colorMode: 'dark',
	// 				toggleColorMode: jest.fn(),
	// 			}));

	// 			// Act
	// 			const { getByTestId } = render(renderHeader());

	// 			// Assert
	// 			expect(getByTestId('toggle-color-mode-button').getAttribute('name')).toBe('SunIcon');
	// 		});
	// 	});

	// 	describe('when is light mode the toggle-color-mode-button', () => {
	// 		it('should be a moon icon', () => {
	// 			// Arrange
	// 			(useColorMode as unknown as jest.Mock).mockImplementation(() => ({
	// 				colorMode: 'light',
	// 				toggleColorMode: jest.fn(),
	// 			}));

	// 			// Act
	// 			const { getByTestId } = render(renderHeader());

	// 			// Assert
	// 			expect(getByTestId('toggle-color-mode-button').getAttribute('name')).toBe('MoonIcon');
	// 		});
	// 	});
	// });

	describe('when user is logged in', () => {
		const userName: string = 'John Doe';
		beforeEach(() => (useUser as unknown as jest.Mock).mockImplementation(() => ({ user: { name: userName } })));

		it('should render the user details in the user profile menu', () => {
			// Act
			const { getByTestId } = render(renderHeader());

			// Assert
			expect(getByTestId('menu-button-logged-in')).toBeTruthy();
		});

		it('should navigate user to `/create-listing` page when the `Create Listing` button is clicked', async () => {
			// Arrange
			let route = '';

			(useRouter as unknown as jest.Mock).mockImplementation(() => ({
				route,
				push: jest.fn((value: string) => (route = value)),
			}));
			// Act
			const { getByTestId } = render(renderHeader());
			await userEvent.click(getByTestId('create-listing-button'));

			// Assert
			expect(route).toBe('/create-listing');
		});

		describe('user avatar', () => {
			const userPicture: string = 'https://i1.wp.com/cdn.auth0.com/avatars/te.png?ssl=1';

			it("should render the user's picture if the user has one", () => {
				// Arrange
				(useUser as unknown as jest.Mock).mockImplementation(() => ({
					user: { name: 'John Doe', picture: userPicture },
				}));

				// Act
				const { getByTestId } = render(renderHeader());

				// Assert
				expect(getByTestId('avatar').id).toBe('provided-picture');
			});

			it('should render default user picture if the user does not have a picture', () => {
				// Act
				const { getByTestId } = render(renderHeader());

				// Assert
				expect(getByTestId('avatar').id).toBe('default-picture');
			});
		});

		describe('user menu list avatar', () => {
			const userPicture: string = 'https://i1.wp.com/cdn.auth0.com/avatars/te.png?ssl=1';

			it("should render the user's picture if the user has one", () => {
				// Arrange
				(useUser as unknown as jest.Mock).mockImplementation(() => ({
					user: { name: 'John Doe', picture: userPicture },
				}));

				// Act
				const { getByTestId } = render(renderHeader());

				// Assert
				expect(getByTestId('menu-list-avatar').id).toBe('menu-list-provided-picture');
			});

			it('should render default user picture if the user does not have a picture', () => {
				// Act
				const { getByTestId } = render(renderHeader());

				// Assert
				expect(getByTestId('menu-list-avatar').id).toBe('menu-list-default-picture');
			});
		});
	});

	describe('when user is logged out', () => {
		beforeEach(() => (useUser as unknown as jest.Mock).mockImplementation(() => ({ user: undefined })));

		it('should not render the user details in the user profile menu', () => {
			// Act
			const { getByTestId } = render(renderHeader());

			// Assert
			expect(getByTestId('menu-button-logged-out')).toBeTruthy();
		});

		it('should trigger handleLogin function when `Create Listing` button is clicked', async () => {
			// Arrange
			const handleSignInWithReturnTo = jest.fn(() => {});
			(useLogin as unknown as jest.Mock).mockImplementation(() => ({
				handleSignInWithReturnTo,
			}));

			// Act
			const { getByTestId } = render(renderHeader());
			await userEvent.click(getByTestId('create-listing-button'));

			// Assert
			expect(handleSignInWithReturnTo).toBeCalledTimes(1);
		});
	});
});
