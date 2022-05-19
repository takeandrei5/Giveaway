import { ButtonPrimary } from '@components';
import { render } from '@testing-library/react';

describe('ButtonPrimary', () => {
	it('should render successfully with default props', () => {
		// Act
		const { baseElement } = render(<ButtonPrimary />);

		// Assert
		expect(baseElement).toBeTruthy();
	});

	it('should match snapshot', () => {
		// Act
		const component = render(<ButtonPrimary />);
		// Assert
		expect(component).toMatchSnapshot();
	});

	it('should execute onClick when clicked correctly', () => {
		// Arrange
		const onClick = jest.fn(() => {});

		// Act
		const { getByTestId } = render(<ButtonPrimary onClick={onClick} />);
		getByTestId('button-primary').click();

		// Assert
		expect(onClick).toHaveBeenCalledTimes(1);
	});
});
