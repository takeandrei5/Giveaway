import { Dropdown } from '@components';
import { DropdownProps } from '@components/shared/Dropdown/types';
import { dropdownOptions } from '@pages/listings/constants';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Dropdown', () => {
	it('should match snapshot', () => {
		// Arrange
		const props: DropdownProps = {
			id: 'dropdown',
			options: [],
			onChangeHandler: (value: string) => {},
			name: 'dropdown-test-name',
			value: 'dropdown-test-value',
		};

		// Act
		const component = render(<Dropdown {...props} />);

		// Assert
		expect(component).toMatchSnapshot();
	});

	it('should render options correctly', () => {
		// Arrange
		const props: DropdownProps = {
			id: 'dropdown',
			options: dropdownOptions,
			onChangeHandler: (value: string) => {},
			name: 'dropdown-test-name',
			value: 'dropdown-test-value',
		};

		// Act
		const { getByTestId } = render(<Dropdown {...props} />);

		// Assert
		expect(getByTestId('dropdown').querySelectorAll('option').length).toBe(dropdownOptions.length);
	});

	it('should trigger onChangeHandler correctly when user selects an option', async () => {
		// Arrange
		const props: DropdownProps = {
			id: 'dropdown',
			options: dropdownOptions,
			onChangeHandler: jest.fn((value: string) => {}),
			name: 'dropdown-test-name',
			value: 'dropdown-test-value',
		};

		// Act
		const component = render(<Dropdown {...props} />);
		await userEvent.selectOptions(component.getByTestId('dropdown'), dropdownOptions[1].value as string);

		// Assert
		expect(props.onChangeHandler).toHaveBeenCalledTimes(1);
	});
});
