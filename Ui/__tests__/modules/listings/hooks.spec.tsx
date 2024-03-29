import { fetchListings } from '@api/webapi/listings/client-side';
import { FetchListingsResponse } from '@api/webapi/listings/types';
import { useInfiniteFetchListings } from '@modules/listings/hooks';
import { renderHook } from '@testing-library/react-hooks';
import { SortingType } from '@utils/types';
import React, { Dispatch } from 'react';
import { useStateMock } from '__tests__/hookUtils';
import { ProviderWrapper, QueryClientWrapper } from '__tests__/wrappers';

jest.mock('next/router', () => ({
	...jest.requireActual('next/router'),
	useRouter: jest.fn(),
}));

jest.mock('@api/webapi/listings/client-side', () => ({
	...jest.requireActual('@api/webapi/listings/client-side'),
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

		(fetchListings as unknown as jest.Mock).mockImplementation(
			(pageNumber: number, pageSize: number, sort: SortingType, filterByCategory?: number | undefined) => ({
				...fetchListingsResponse.listings,
			})
		);
	});

	describe('useQuery', () => {
		it('should fetch data correctly', async () => {
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

	//todo
	// describe('when handleSortingDropdownChange is called', () => {
	// it('should call setSort', async () => {
	// 	// Arrange
	// 	const [state, setState] = useStateMock();
	// 	jest.spyOn(React, 'useState').mockReturnValue([state, setState]);
	// 	const newSortValue: SortingType = 'Title DESC';
	// 	const { result, waitForNextUpdate } = renderHook(() => useInfiniteFetchListings(), {
	// 		wrapper: Wrapper,
	// 	});
	// 	// Act
	// 	result.current.handleSortingDropdownChange(newSortValue);
	// 	await waitForNextUpdate();
	// 	// Assert
	// 	expect(setState).toHaveBeenCalledTimes(1);
	// });
	// });
});
