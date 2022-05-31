import { TitleFormControl } from '@modules/create-update-listing/shared/TitleFormControl';
import { render } from '@testing-library/react';
import { TitleFormControlProps } from '@modules/create-update-listing/shared/TitleFormControl/types';
import { FieldMetaProps, useField } from 'formik';
import { useCheckFormIsInvalid } from '@components/FormControl/hooks';

jest.mock('formik', () => ({
	...jest.requireActual('formik'),
	useField: jest.fn(),
}));

jest.mock('@components/FormControl/hooks', () => ({
	useCheckFormIsInvalid: jest.fn((meta: FieldMetaProps<unknown>) => ({})),
}));

describe('TitleFormControl', () => {
	it('should match snapshot', () => {
		// Arrange
		const props: TitleFormControlProps = {
			name: 'test-name',
		};

		(useField as unknown as jest.Mock).mockImplementation(() => [
			{
				onBlur: jest.fn(),
				onChange: jest.fn(),
				value: 'test-name',
			},
		]);

		(useCheckFormIsInvalid as unknown as jest.Mock).mockImplementation((meta: FieldMetaProps<unknown>) => ({
			isInvalid: false,
		}));

		// Act
		const component = render(<TitleFormControl {...props} />);

		// Assert
		expect(component).toMatchSnapshot();
	});
});
