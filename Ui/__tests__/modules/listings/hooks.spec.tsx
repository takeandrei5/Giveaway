import { fetchListings } from '@api/listings';
import { FetchListingsResponse } from '@api/listings/types';
import { useInfiniteFetchListings } from '@modules/listings/hooks';
import { renderHook } from '@testing-library/react-hooks';
import { SortingType } from '@utils/types';
import { ProviderWrapper, QueryClientWrapper } from '__tests__/wrappers';

jest.mock('next/router', () => ({
	...jest.requireActual('next/router'),
	useRouter: jest.fn(),
}));

jest.mock('@api/listings', () => ({
	...jest.requireActual('@api/listings'),
	fetchListings: jest.fn(),
}));

jest.mock('next/config', () => () => ({
	publicRuntimeConfig: {
		apiUrl: 'http://localhost/',
	},
	serverRuntimeConfig: {
		apiUrl: 'http://localhost/',
	},
}));

const Wrapper = ({ children }: { children: JSX.Element }): JSX.Element => {
	return (
		<ProviderWrapper>
			<QueryClientWrapper>{children}</QueryClientWrapper>
		</ProviderWrapper>
	);
};

describe('useInfiniteFetchListings', () => {
	describe('useQuery', () => {
		let pageNumber: number = 1;
		let pageSize: number = 10;
		let orderBy: SortingType = 'Title ASC';
		let filterByCategory: number = 1;

		let fetchListingsResponse: FetchListingsResponse = {
			listings: {
				currentPage: pageNumber,
				pageSize,
				totalPages: 1,
				totalCount: 1,
				hasNextPage: false,
				hasPreviousPage: false,
				result: [
					{
						id: 'test-id',
						title: 'test-title',
						createdAt: new Date(),
						image: 'test-image-url',
					},
				],
			},
		};

		beforeEach(() => {
			pageNumber = 1;
			pageSize = 10;
			orderBy = 'Title ASC';
			filterByCategory = 1;

			fetchListingsResponse = {
				listings: {
					currentPage: pageNumber,
					pageSize,
					totalPages: 1,
					totalCount: 1,
					hasNextPage: false,
					hasPreviousPage: false,
					result: [
						{
							id: 'test-id',
							title: 'test-title',
							createdAt: new Date(),
							image: 'test-image-url',
						},
					],
				},
			};
		});

		it('should fetch data correctly', async () => {
			// Arrange
			(fetchListings as unknown as jest.Mock).mockImplementation(
				(pageNumber: number, pageSize: number, sort: SortingType, filterByCategory?: number | undefined) => ({
					...fetchListingsResponse.listings,
				})
			);

			// Act
			const { result, waitForNextUpdate } = renderHook(() => useInfiniteFetchListings(), {
				wrapper: Wrapper,
			});

			await waitForNextUpdate();

			// Assert
			expect(result.current.isLoading).toBe(false);
			expect(result.current.nextData).toEqual(fetchListingsResponse.listings);
		});
	});
});
