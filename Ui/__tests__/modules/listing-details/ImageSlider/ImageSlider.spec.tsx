import { ImageSlider } from '@modules/listing-details/ImageSlider';
import { ImageSliderProps } from '@modules/listing-details/ImageSlider/types';
import { render } from '@testing-library/react';

describe('ImageSlider', () => {
	it('should match snapshot', () => {
		// Arrange
		const props: ImageSliderProps = {
			images: ['https://via.placeholder.com/150'],
		};

		// Act
		const component = render(<ImageSlider {...props} />);

		// Assert
		expect(component).toBeTruthy();
	});
});
