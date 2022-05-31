import { ButtonPrimary } from '@components';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('ButtonPrimary', () => {
	it('should match snapshot', () => {
		// Act
		const { container } = render(<ButtonPrimary />);
		// Assert
		expect(container).toMatchSnapshot();
	});

	it('should execute onClick correctly when button is clicked', async () => {
		// Arrange
		const onClick = jest.fn(() => {});

		// Act
		const { getByTestId } = render(<ButtonPrimary onClick={onClick} />);
		await userEvent.click(getByTestId('button-primary'));

		// Assert
		expect(onClick).toHaveBeenCalledTimes(1);
	});
});
