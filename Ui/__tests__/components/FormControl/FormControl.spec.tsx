import { FormControl } from '@components';
import { useCheckFormIsInvalid } from '@components/FormControl/hooks';
import { FormControlProps } from '@components/FormControl/types';
import { render } from '@testing-library/react';
import { FieldMetaProps, useField } from 'formik';
import React from 'react';

jest.mock('formik', () => ({
	...jest.requireActual('formik'),
	useField: jest.fn(),
}));

jest.mock('@components/FormControl/hooks', () => ({
	useCheckFormIsInvalid: jest.fn((meta: FieldMetaProps<unknown>) => ({})),
}));

describe('FormControl', () => {
	it('should match snapshot', () => {
		// Arrange
		const props: FormControlProps = {
			id: 'test-id',
			label: 'test-label',
			name: 'test-name',
			children: <></>,
		};

		(useField as unknown as jest.Mock).mockImplementation(() => [
			{
				onBlur: jest.fn(),
				onChange: jest.fn(),
				value: 'test-name',
			},
			{
				value: 'test-name',
				error: '',
				touched: false,
				initialValue: 'test-name',
				initialTouched: false,
				initialError: '',
			},
		]);

		// Act
		const component = render(<FormControl {...props} />);

		// Assert
		expect(component).toMatchSnapshot();
	});

	it('should render error message if invalid', () => {
		// Arrange
		const props: FormControlProps = {
			id: 'test-id',
			label: 'test-label',
			name: 'test-name',
			children: <></>,
		};

		const meta: FieldMetaProps<unknown> = {
			value: 'test-name',
			error: 'error',
			touched: false,
			initialValue: 'test-name',
			initialTouched: false,
			initialError: '',
		};

		(useField as unknown as jest.Mock).mockImplementation(() => [
			{
				onBlur: jest.fn(),
				onChange: jest.fn(),
				value: 'test-name',
			},
			meta,
		]);

		(useCheckFormIsInvalid as unknown as jest.Mock).mockImplementation((meta: FieldMetaProps<unknown>) => ({
			isInvalid: true,
		}));

		// Act
		const { getByTestId } = render(<FormControl {...props} />);

		// Assert
		expect(getByTestId('form-control-error-message')).toBeTruthy();
	});

	it('should render children with the correct isInvalid prop', () => {
		// Arrange
		const TestComponent = ({ isInvalid = false }: any) => {
			return <div data-testid='children-test-id' id={`isInvalid-${isInvalid ? true : false}`} />;
		};

		const props: FormControlProps = {
			id: 'test-id',
			label: 'test-label',
			name: 'test-name',
			children: <TestComponent />,
		};

		const meta: FieldMetaProps<unknown> = {
			value: 'test-name',
			error: 'error',
			touched: false,
			initialValue: 'test-name',
			initialTouched: false,
			initialError: '',
		};

		(useField as unknown as jest.Mock).mockImplementation(() => [
			{
				onBlur: jest.fn(),
				onChange: jest.fn(),
				value: 'test-name',
			},
			meta,
		]);

		(useCheckFormIsInvalid as unknown as jest.Mock).mockImplementation((meta: FieldMetaProps<unknown>) => ({
			isInvalid: true,
		}));

		// Act
		const { getByTestId } = render(<FormControl {...props} />);

		// Assert
		expect(getByTestId('children-test-id').id).toBe('isInvalid-true');
	});
});
