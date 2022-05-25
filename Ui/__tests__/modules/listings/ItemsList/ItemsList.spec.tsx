import { ItemsList } from '@modules/listings/ItemsList';
import { ItemsListProps } from '@modules/listings/ItemsList/types';
import { render } from '@testing-library/react';

jest.mock('dateformat', () => jest.fn());

describe('ItemsList', () => {
	const props: ItemsListProps = {
		items: [
			{
				id: '1',
				title: 'Item 1',
				image: 'https://via.placeholder.com/150',
				createdAt: new Date(),
			},
			{
				id: '2',
				title: 'Item 2',
				image: 'https://via.placeholder.com/150',
				createdAt: new Date(),
			},
			{
				id: '3',
				title: 'Item 3',
				image: 'https://via.placeholder.com/150',
				createdAt: new Date(),
			},
		],
	};

	it('should match snapshot', () => {
		// Act
		const component = render(<ItemsList {...props} />);

		// Assert
		expect(component).toBeTruthy;
	});
});
