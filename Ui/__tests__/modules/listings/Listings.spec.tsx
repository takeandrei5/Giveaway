import { Listings } from '@modules/listings';
import { useInfiniteFetchListings } from '@modules/listings/hooks';
import { ListingsProps } from '@modules/listings/types';
import store from '@redux/store';
import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { SortingType } from '@utils/types';
import { getEventListeners } from 'events';

jest.mock('dateformat', () => jest.fn());

jest.mock('@modules/listings/hooks', () => ({
	useInfiniteFetchListings: jest.fn(),
}));

const wrapper = ({ children }: { children: JSX.Element }) => <Provider store={store}>{children}</Provider>;

describe('Listings', () => {
	const props: ListingsProps = {
		options: [
			{
				value: 1,
				displayValue: 'test1',
			},
			{
				value: 2,
				displayValue: 'test1',
			},
			{
				value: 3,
				displayValue: 'test1',
			},
		],
	};

	it('should match snapshot', () => {
		// Arrange
		(useInfiniteFetchListings as unknown as jest.Mock).mockImplementation(() => ({
			isLoading: false,
			totalData: [],
			nextData: {},
			sort: 'Title ASC',
			setSort: jest.fn(),
			refetchListings: jest.fn(),
		}));

		// Act
		const { container } = render(<Listings {...props} />, { wrapper });

		// Assert
		expect(container).toMatchSnapshot();
	});

	it('should execute onChangeHandler correctly', async () => {
		// Arrange
		const setSortMock = jest.fn<void, [val: SortingType]>();

		(useInfiniteFetchListings as unknown as jest.Mock).mockImplementation(() => ({
			isLoading: false,
			totalData: [],
			nextData: {},
			sort: 'Title ASC',
			setSort: setSortMock,
			refetchListings: jest.fn(),
		}));

		// Act
		const { getByTestId } = render(<Listings {...props} />, { wrapper });

		await userEvent.selectOptions(getByTestId('dropdown'), getByTestId('dropdown').querySelector('option')!.value);

		// Assert
		expect(setSortMock).toHaveBeenCalledTimes(1);
	});

	describe('data refetching on scroll', () => {
		describe('when there is no more data ', () => {
			const refetchListingsMock = jest.fn();

			it('should not trigger refetch if `useInfiniteFetchListings` returns `nextData` falsy', () => {
				// Arrange
				(useInfiniteFetchListings as unknown as jest.Mock).mockImplementation(() => ({
					isLoading: false,
					totalData: [],
					nextData: undefined,
					sort: 'Title ASC',
					setSort: jest.fn(),
					refetchListings: refetchListingsMock,
				}));

				// Act
				render(<Listings {...props} />, { wrapper });
				fireEvent.scroll(window, { target: { scrollY: 500 } });

				// Assert
				expect(refetchListingsMock).not.toHaveBeenCalled();
			});

			it('should not trigger refetch if `useInfiniteFetchListings` returns `nextData.hasNextPage` false', () => {
				// Arrange
				const setSortMock = jest.fn<void, [val: SortingType]>();
				const refetchListingsMock = jest.fn();

				(useInfiniteFetchListings as unknown as jest.Mock).mockImplementation(() => ({
					isLoading: false,
					totalData: [],
					nextData: {
						hasNextPage: false,
					},
					sort: 'Title ASC',
					setSort: setSortMock,
					refetchListings: refetchListingsMock,
				}));

				// Act
				render(<Listings {...props} />, { wrapper });
				fireEvent.scroll(window, { target: { scrollY: 500 } });

				// Assert
				expect(refetchListingsMock).not.toHaveBeenCalled();
			});
		});

		describe('when there is data ', () => {
			it('should not refetch if `useInfiniteFetchListings` returns `nextData.hasNextPage` true', () => {
				// Arrange
				const refetchListingsMock = jest.fn();

				(useInfiniteFetchListings as unknown as jest.Mock).mockImplementation(() => ({
					isLoading: false,
					totalData: [],
					nextData: {
						hasNextPage: true,
					},
					sort: 'Title ASC',
					setSort: jest.fn(),
					refetchListings: refetchListingsMock,
				}));

				// Act
				render(<Listings {...props} />, { wrapper });
				fireEvent.scroll(window, { target: { scrollY: 500 } });

				// Assert
				expect(refetchListingsMock).toHaveBeenCalledTimes(1);
			});
		});
	});
});
