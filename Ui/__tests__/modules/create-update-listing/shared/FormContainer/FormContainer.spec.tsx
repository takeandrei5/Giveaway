import INITIAL_VALUES from '@modules/create-update-listing/create-listing/constants';
import { FormContainer } from '@modules/create-update-listing/shared';
import { FormContainerProps } from '@modules/create-update-listing/shared/FormContainer/types';
import { FormikValues } from '@modules/create-update-listing/shared/types';
import { getByText, render, renderHook } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClientWrapper } from '__tests__/wrappers';
import { FormikProps, useFormik } from 'formik';
import { useRouter } from 'next/router';

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

jest.mock('next/router', () => ({
	...jest.requireActual('next/router'),
	useRouter: jest.fn(),
}));

describe('FormContainer', () => {
	const props: FormContainerProps = {
		formik: {} as FormikProps<FormikValues>,
		pageTitle: 'test-page-title',
		resetButtonText: 'test-reset-button-text',
		submitButtonText: 'test-submit-button-text',
	};

	it('should match snapshot', () => {
		// Arrange
		const { result } = renderHook(() =>
			useFormik<FormikValues>({
				initialValues: INITIAL_VALUES,
				onSubmit: (values: FormikValues) => {},
			})
		);

		props.formik = result.current;

		// Act
		const { container } = render(<FormContainer {...props} />, { wrapper: QueryClientWrapper });

		// Assert
		expect(container).toMatchSnapshot();
	});

	it('should redirect user to `/listing` page if the back button is clicked', async () => {
		// Arrange
		let route = '';

		(useRouter as unknown as jest.Mock).mockImplementation(() => ({
			route,
			push: jest.fn((value: string) => (route = value)),
		}));

		const { result } = renderHook(() =>
			useFormik<FormikValues>({
				initialValues: INITIAL_VALUES,
				onSubmit: (values: FormikValues) => {},
			})
		);

		props.formik = result.current;

		const { getByText } = render(<FormContainer {...props} />, { wrapper: QueryClientWrapper });

		// Act
		await userEvent.click(getByText('Back'));

		// Assert
		expect(route).toBe('/listings');
	});
});
