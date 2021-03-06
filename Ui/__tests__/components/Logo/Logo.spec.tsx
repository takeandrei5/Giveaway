import { Logo } from '@components';
import { LogoProps } from '@components/Logo/types';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Logo', () => {
	it('should match snapshot', () => {
		// Arrange
		const props: LogoProps = { onClick: () => {} };

		// Act
		const { container } = render(<Logo {...props} />);

		// Assert
		expect(container).toMatchSnapshot();
	});

	it('should trigger onClick when the logo image is clicked successfully', async () => {
		// Arrange
		const props: LogoProps = {
			onClick: jest.fn(() => {}),
		};

		// Act
		const { getByTestId } = render(<Logo {...props} />);
		await userEvent.click(getByTestId('logo-icon'));

		// Assert
		expect(props.onClick).toHaveBeenCalledTimes(1);
	});
});
