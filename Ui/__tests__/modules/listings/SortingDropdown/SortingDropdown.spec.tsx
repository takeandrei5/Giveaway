import { SortingDropdown } from '@modules/listings/SortingDropdown';
import { SortingDropdownProps } from '@modules/listings/SortingDropdown/types';
import { render } from '@testing-library/react';

describe('SortingDropdown', () => {
	it('should match snapshot', () => {
		// Arrange
		const props: SortingDropdownProps = {
			id: 'sorting-dropdown',
			options: [],
			onChangeHandler: (value: string) => {},
			name: 'sorting-dropdown-test-name',
			value: 'sorting-dropdown-test-value',
		};

		// Act
		const { container } = render(<SortingDropdown {...props} />);

		// Assert
		expect(container).toMatchSnapshot();
	});
});
