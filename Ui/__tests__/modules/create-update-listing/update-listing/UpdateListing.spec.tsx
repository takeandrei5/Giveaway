import { UpdateListing } from '@modules/create-update-listing';
import { UpdateListingInitialValues } from '@pages/update-listing/[id]/types';
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

describe('UpdateListing', () => {
	const accessToken: string = 'access-token';
	const id: string = 'id';
	const initialValues: UpdateListingInitialValues = {
		title: 'initial-title',
		category: 1,
		description: 'initial-description',
		images: [],
	};

	it('should match snapshot', () => {
		// Arrange & Act
		const { container } = render(<UpdateListing id={id} initialValues={initialValues} />, {
			wrapper: QueryClientWrapper,
		});

		// Assert
		expect(container).toMatchSnapshot();
	});
});
