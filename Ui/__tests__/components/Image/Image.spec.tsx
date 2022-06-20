import { Image } from '@components';
import { ImageProps } from '@components/Image/types';
import { render } from '@testing-library/react';
import { TEST_IMAGE } from '__tests__/constants';

describe('Image', () => {
	it('should match snapshot', () => {
		// Arrange
		const props: ImageProps = {
			src: TEST_IMAGE,
		};

		// Act
		const { container } = render(<Image {...props} />);

		// Assert
		expect(container).toMatchSnapshot();
	});
});
