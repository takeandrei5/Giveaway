import { Category } from '@modules/listings/CategoryBox/Category';
import { CategoryProps } from '@modules/listings/CategoryBox/Category/types';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { CategoryState } from '@redux/slices/changeCategorySlice';
import { EmptyObject } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

jest.mock('@redux/hooks', () => ({
	useAppDispatch: jest.fn(),
	useAppSelector: jest.fn((categoryState) => ({})),
}));

describe('Category', () => {
	it('should match snapshot', () => {
		// Arrange
		const props: CategoryProps = {
			category: 'books',
			name: 'test',
			image: 'https://via.placeholder.com/150',
		};

		// Act
		const component = render(<Category {...props} />);

		// Assert
		expect(component).toMatchSnapshot();
	});

	it('should trigger useCallback everytime the category box is clicked', async () => {
		// Arrange
		const props: CategoryProps = {
			category: 'books',
			name: 'test',
			image: 'https://via.placeholder.com/150',
		};

		// const useCallbackSpy = jest.spyOn(React, 'useCallback');

		(useAppSelector as unknown as jest.Mock).mockImplementation((state) => ({ category: 'books' }));

		(useAppDispatch as unknown as jest.Mock).mockImplementation(() => jest.fn());

		// Act
		const { getByTestId } = render(<Category {...props} />);
		await userEvent.click(getByTestId('category-box'));

		// Assert
		expect(useAppDispatch).toBeCalledTimes(1);
	});
});
