import { useCheckFormIsInvalid } from '@components/FormControl/hooks';
import { DescriptionFormControl } from '@modules/create-update-listing/shared/DescriptionFormControl';
import { DescriptionFormControlProps } from '@modules/create-update-listing/shared/DescriptionFormControl/types';
import { render } from '@testing-library/react';
import { FieldMetaProps, useField } from 'formik';

jest.mock('formik', () => ({
	...jest.requireActual('formik'),
	useField: jest.fn(),
}));

jest.mock('@components/FormControl/hooks', () => ({
	useCheckFormIsInvalid: jest.fn((meta: FieldMetaProps<unknown>) => ({})),
}));

describe('DescriptionFormControl', () => {
	it('should match snapshot', () => {
		// Arrange
		const props: DescriptionFormControlProps = {
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
		const component = render(<DescriptionFormControl {...props} />);

		// Assert
		expect(component).toMatchSnapshot();
	});
});
