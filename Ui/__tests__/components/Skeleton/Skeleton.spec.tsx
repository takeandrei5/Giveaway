import { Skeleton } from '@components';
import { render } from '@testing-library/react';

describe('Skeleton', () => {
	it('should match snapshot', () => {
		// Act
		const { container } = render(<Skeleton />);

		// Assert
		expect(container).toMatchSnapshot();
	});
});
