import { Skeleton } from '@components';
import { render } from '@testing-library/react';

describe('Skeleton', () => {
	it('should match snapshot', () => {
		const component = render(<Skeleton />);

		expect(component).toMatchSnapshot();
	});
});
