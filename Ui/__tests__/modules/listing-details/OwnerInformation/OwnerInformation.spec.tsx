import { OwnerInformation } from '@modules/listing-details/OwnerInformation';
import { OwnerInformationProps } from '@modules/listing-details/OwnerInformation/types';
import { render } from '@testing-library/react';

describe('OwnerInformation', () => {
	it('should match snapshot', () => {
		// Arrange
		const props: OwnerInformationProps = {
			name: 'John Doe',
			email: 'test-email@test.com',
			image: 'test-image-url',
		};

		// Act
		const { container } = render(<OwnerInformation {...props} />);

		// Assert
		expect(container).toBeTruthy();
	});
});
