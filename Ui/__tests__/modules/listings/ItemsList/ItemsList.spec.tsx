import { ItemsList } from '@modules/listings/ItemsList';
import { ItemsListProps } from '@modules/listings/ItemsList/types';
import { render } from '@testing-library/react';
import { TEST_IMAGE } from '__tests__/constants';

jest.mock('dateformat', () => jest.fn());

describe('ItemsList', () => {
	const props: ItemsListProps = {
		items: [
			{
				id: '1',
				title: 'Item 1',
				image: TEST_IMAGE,
				createdAt: new Date(),
			},
			{
				id: '2',
				title: 'Item 2',
				image: TEST_IMAGE,
				createdAt: new Date(),
			},
			{
				id: '3',
				title: 'Item 3',
				image: TEST_IMAGE,
				createdAt: new Date(),
			},
		],
	};

	it('should match snapshot', () => {
		// Act
		const { container } = render(<ItemsList {...props} />);

		// Assert
		expect(container).toMatchSnapshot();
	});
});
