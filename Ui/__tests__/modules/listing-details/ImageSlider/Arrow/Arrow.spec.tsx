import { Arrow } from '@modules/listing-details/ImageSlider/Arrow';
import { ArrowProps } from '@modules/listing-details/ImageSlider/Arrow/types';
import { render } from '@testing-library/react';

describe('Arrow', () => {
	it('should render PrevArrow if isNextArrow is false', () => {
		// Arrange
		const props: ArrowProps = {};

		// Act
		const {
			container: { innerHTML },
		} = render(<Arrow {...props} />);

		// Assert
		expect(innerHTML).toContain('class="slick-prev slick-arrow"');
	});

	it('should render PrevArrow if isNextArrow is true', () => {
		// Arrange
		const props: ArrowProps = {
			isNextArrow: true,
		};

		// Act
		const {
			container: { innerHTML },
		} = render(<Arrow {...props} />);

		// Assert
		expect(innerHTML).toContain('class="slick-next slick-arrow"');
	});
});
