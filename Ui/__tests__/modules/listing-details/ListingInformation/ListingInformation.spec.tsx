import { ListingInformation } from '@modules/listing-details/ListingInformation';
import { ListingInformationProps } from '@modules/listing-details/ListingInformation/types';
import { render } from '@testing-library/react';

jest.mock('dateformat', () => jest.fn());

describe('ListingInformation', () => {
	it('should match snapshot', () => {
		// Arrange
		const props: ListingInformationProps = {
			title: 'test-title',
			description: 'test-description',
			createdAt: new Date(),
			images: ['test-image-url'],
		};

		// Act
		const { container } = render(<ListingInformation {...props} />);

		// Assert
		expect(container).toMatchSnapshot();
	});
});
