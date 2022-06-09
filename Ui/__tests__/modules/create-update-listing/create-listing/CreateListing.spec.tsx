import { CreateListing } from '@modules/create-update-listing';
import { useCreateListing } from '@modules/create-update-listing/create-listing/hooks';
import { render } from '@testing-library/react';
import { useGetAccessToken } from '@utils/hooks';
import { FieldMetaProps } from 'formik';

jest.mock('@utils/hooks', () => ({
	useGetAccessToken: jest.fn(),
}));

jest.mock('@modules/create-update-listing/create-listing/hooks', () => ({
	useCreateListing: jest.fn(),
}));

jest.mock('@components/FormControl/hooks', () => ({
	useCheckFormIsInvalid: jest.fn((meta: FieldMetaProps<unknown>) => ({})),
}));

jest.mock('next/config', () => () => ({
	publicRuntimeConfig: {
		apiUrl: 'http://localhost/',
	},
	serverRuntimeConfig: {
		apiUrl: 'http://localhost/',
	},
}));

jest.mock('uuid', () => ({
	__esModule: true,
	v4: jest.fn().mockReturnValue('9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'),
}));

describe('CreateListing', () => {
	it('should match snapshot', () => {
		// Arrange
		const data: string = 'test-data';

		(useGetAccessToken as unknown as jest.Mock).mockImplementation(() => ({
			isFetched: true,
			data,
		}));

		(useCreateListing as unknown as jest.Mock).mockImplementation(() => ({
			formik: {},
		}));

		// Act
		// const component = render(<CreateListing />); //todo

		// Assert
		// expect(true).toBeTruthy();
	});
});
