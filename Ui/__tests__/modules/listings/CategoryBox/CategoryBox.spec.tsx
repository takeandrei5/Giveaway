import { CategoryBox } from '@modules/listings/CategoryBox';
import { CategoryBoxProps } from '@modules/listings/CategoryBox/types';
import store from '@redux/store';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

const wrapper = ({ children }: { children: JSX.Element }) => <Provider store={store}>{children}</Provider>;

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
		const { container } = render(<CategoryBox {...props} />, {
			wrapper,
		});

		// Assert
		expect(container).toMatchSnapshot();
	});
});
