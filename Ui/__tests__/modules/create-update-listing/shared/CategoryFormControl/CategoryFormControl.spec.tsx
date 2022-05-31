import { CategoryFormControl } from '@modules/create-update-listing/shared/CategoryFormControl';
import { CategoryFormControlProps } from '@modules/create-update-listing/shared/CategoryFormControl/types';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useField } from 'formik';

jest.mock('formik', () => ({
	...jest.requireActual('formik'),
	useField: jest.fn(),
}));

describe('CategoryFormControl', () => {
	it('should match snapshot', () => {
		// Arrange
		const props: CategoryFormControlProps = {
			name: 'test-name',
		};

		(useField as unknown as jest.Mock).mockImplementation(() => [
			{
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
		const { container } = render(<CategoryFormControl {...props} />);

		// Assert
		expect(container).toMatchSnapshot();
	});

	it('should execute onChangeHandler correctly', async () => {
		// Arrange
		const props: CategoryFormControlProps = {
			name: 'test-name',
		};

		const setValueMock = jest.fn<{ value: boolean; shouldValidate?: boolean }, any>();
		const setTouchedMock = jest.fn<{ value: boolean; shouldValidate?: boolean }, any>();

		(useField as unknown as jest.Mock).mockImplementation(() => [
			{
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
			{
				setValue: setValueMock,
				setTouched: setTouchedMock,
			},
		]);

		// Act
		const { getByTestId } = render(<CategoryFormControl {...props} />);

		await userEvent.selectOptions(getByTestId('dropdown'), getByTestId('dropdown').querySelector('option')!.value);

		// Assert
		expect(setValueMock).toHaveBeenCalledTimes(1);
		expect(setTouchedMock).toHaveBeenCalledTimes(1);
	});
});
