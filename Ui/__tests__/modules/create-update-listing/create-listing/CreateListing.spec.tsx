import { CreateListing } from '@modules/create-update-listing';
import { render } from '@testing-library/react';
import { QueryClientWrapper } from '__tests__/wrappers';
import { FieldMetaProps } from 'formik';

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
		// Arrange & Act
		const { container } = render(<CreateListing />, { wrapper: QueryClientWrapper });

		//Assert
		expect(container).toMatchSnapshot();
	});
});
