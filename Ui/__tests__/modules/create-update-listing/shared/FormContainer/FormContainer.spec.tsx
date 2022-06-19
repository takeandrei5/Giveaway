import INITIAL_VALUES from '@modules/create-update-listing/create-listing/constants';
import { FormContainer } from '@modules/create-update-listing/shared';
import { FormContainerProps } from '@modules/create-update-listing/shared/FormContainer/types';
import { FormikValues } from '@modules/create-update-listing/shared/types';
import { render, renderHook } from '@testing-library/react';
import { FormikProps, useFormik } from 'formik';
import { QueryClientWrapper } from '__tests__/wrappers';

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

describe('FormContainer', () => {
	it('should match snapshot', () => {
		// Arrange
		const { result } = renderHook(() =>
			useFormik<FormikValues>({
				initialValues: INITIAL_VALUES,
				onSubmit: (values: FormikValues) => {},
			})
		);

		const props: FormContainerProps = {
			formik: result.current,
			pageTitle: 'test-page-title',
			resetButtonText: 'test-reset-button-text',
			submitButtonText: 'test-submit-button-text',
		};

		// Act
		const { container } = render(<FormContainer {...props} />, { wrapper: QueryClientWrapper });

		// Assert
		expect(container).toMatchSnapshot();
	});
});
