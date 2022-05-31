import { Image } from '@components';
import { ImageProps } from '@components/Image/types';
import { render } from '@testing-library/react';

describe('Image', () => {
	it('should match snapshot', () => {
		// Arrange
		const props: ImageProps = {
			src: 'https://via.placeholder.com/150',
		};

		// Act
		const { container } = render(<Image {...props} />);

		// Assert
		expect(container).toMatchSnapshot();
	});
});
