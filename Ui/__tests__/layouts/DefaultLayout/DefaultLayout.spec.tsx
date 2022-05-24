import { useUser } from '@auth0/nextjs-auth0';
import { DefaultLayout } from '@layouts';
import { render } from '@testing-library/react';

jest.mock('@auth0/nextjs-auth0', () => ({ ...jest.requireActual('@auth0/nextjs-auth0'), useUser: jest.fn() }));

describe('DefaultLayout', () => {
	it('should match snapshot', () => {
		// Arrange
		(useUser as unknown as jest.Mock).mockImplementation(() => ({ user: undefined }));

		// Act
		const component = render(<DefaultLayout children={<></>} />);

		// Assert
		expect(component).toMatchSnapshot();
	});
});
