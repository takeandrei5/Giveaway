import { ButtonPrimary } from '@components';
import { render } from '@testing-library/react';

describe('ButtonPrimary', () => {
	it('should match snapshot', () => {
		// Act
		const component = render(<ButtonPrimary />);
		// Assert
		expect(component).toMatchSnapshot();
	});

	it('should execute onClick correctly when button is clicked', () => {
		// Arrange
		const onClick = jest.fn(() => {});

		// Act
		const { getByTestId } = render(<ButtonPrimary onClick={onClick} />);
		getByTestId('button-primary').click();

		// Assert
		expect(onClick).toHaveBeenCalledTimes(1);
	});
});
