import { Skeleton } from '@components';
import { render } from '@testing-library/react';

describe('Skeleton component', () => {
	it('should render successfully with default props', () => {
		// Act
		const { baseElement } = render(<Skeleton />);

		// Assert
		expect(baseElement).toBeTruthy();
	});

	it('should match snapshot', () => {
		const component = render(<Skeleton />);

		expect(component).toMatchSnapshot();
	});
});
