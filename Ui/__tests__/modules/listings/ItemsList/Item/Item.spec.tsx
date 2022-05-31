import { Item } from '@modules/listings/ItemsList/Item';
import { ItemProps } from '@modules/listings/ItemsList/Item/types';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/router';

jest.mock('dateformat', () => jest.fn());
jest.mock('next/router', () => ({
	...jest.requireActual('next/router'),
	useRouter: jest.fn(),
}));

describe('Item', () => {
	const props: ItemProps = {
		id: '1',
		title: 'Item 1',
		image: 'https://via.placeholder.com/150',
		createdAt: new Date(),
	};

	it('should match snapshot', () => {
		// Act
		const { container } = render(<Item {...props} />);

		// Assert
		expect(container).toMatchSnapshot();
	});

	describe('onClick', () => {
		(useRouter as unknown as jest.Mock).mockImplementation(() => ({
			push: jest.fn((value: string) => {}),
		}));

		it('should call onClickHandler every time is clicked', async () => {
			// Arrange
			const jestOnClickHandler: jest.Mock = jest.fn((value: string) => {});
			(useRouter as unknown as jest.Mock).mockImplementation(() => ({
				push: jestOnClickHandler,
			}));

			// Act
			const { getByTestId } = render(<Item {...props} />);

			await userEvent.click(getByTestId('item'));

			// Assert
			expect(jestOnClickHandler).toHaveBeenCalledTimes(1);
		});

		it('should redirect user to `/listings/${id}` when called', async () => {
			// Arrange
			const jestOnClickHandler: jest.Mock = jest.fn((value: string) => (router = value));
			let router: string = '';
			(useRouter as unknown as jest.Mock).mockImplementation(() => ({
				router,
				push: jestOnClickHandler,
			}));

			// Act
			const { getByTestId } = render(<Item {...props} />);

			await userEvent.click(getByTestId('item'));

			// Assert
			expect(router).toBe(`/listings/${props.id}`);
		});
	});
});
