import { ImageSlider } from '@modules/listing-details/ImageSlider';
import { ImageSliderProps } from '@modules/listing-details/ImageSlider/types';
import { render } from '@testing-library/react';
import { TEST_IMAGE } from '__tests__/constants';

describe('ImageSlider', () => {
	it('should match snapshot', () => {
		// Arrange
		const props: ImageSliderProps = {
			images: [TEST_IMAGE],
		};

		// Act
		const { container } = render(<ImageSlider {...props} />);

		// Assert
		expect(container).toMatchSnapshot();
	});
});
