import { ButtonContainer } from '@modules/create-update-listing/shared/ButtonContainer';
import { ButtonContainerProps } from '@modules/create-update-listing/shared/ButtonContainer/types';
import { render } from '@testing-library/react';

describe('ButtonContainer', () => {
	it('should match snapshot', () => {
		// Arrange
		const props: ButtonContainerProps = {
			resetButtonText: 'reset',
			submitButtonText: 'submit',
		};

		// Act
		const component = render(<ButtonContainer {...props} />);

		// Assert
		expect(component).toMatchSnapshot();
	});
});
