import { CategoryBox } from '@modules/listings/CategoryBox';
import { CategoryBoxProps } from '@modules/listings/CategoryBox/types';
import store from '@redux/store';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

describe('CategoryBox', () => {
	it('should match snapshot', () => {
		// Arrange
		const props: CategoryBoxProps = {
			categories: [
				{
					category: 'books',
					name: 'test',
					image: 'https://via.placeholder.com/150',
				},
			],
		};

		// Act
		const { container } = render(
			<Provider store={store}>
				<CategoryBox {...props} />
			</Provider>
		);

		// Assert
		expect(container).toMatchSnapshot();
	});
});
