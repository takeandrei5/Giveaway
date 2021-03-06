import { Footer } from '@components';
import { stackItems } from '@components/Footer/constants';
import { render } from '@testing-library/react';

describe('Footer', () => {
	it('should match snapshot', () => {
		// Act
		const { container } = render(<Footer />);

		// Assert
		expect(container).toMatchSnapshot();
	});

	it('should render a stack of items', () => {
		// Act
		const chakraStacksLength: number = stackItems.length;

		const { getByTestId } = render(<Footer />);

		// Assert
		expect(getByTestId('footer').querySelectorAll('#footer-stack-item').length).toBe(chakraStacksLength);
	});
});
