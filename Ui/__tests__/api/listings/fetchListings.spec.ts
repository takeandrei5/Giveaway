import { fetchListings } from '@api/listings';
import { FetchListingsResponse } from '@api/listings/types';
import axiosInstance from '@utils/axios';
import { SortingType } from '@utils/types';
import MockAdapter from 'axios-mock-adapter';

jest.mock('next/config', () => () => ({
	publicRuntimeConfig: {
		apiUrl: 'http://localhost/',
	},
	serverRuntimeConfig: {
		apiUrl: 'http://localhost/',
	},
}));

describe('fetchListings', () => {
	let mock: MockAdapter;

	beforeAll(() => {
		mock = new MockAdapter(axiosInstance);
	});

	afterEach(() => {
		mock.reset();
	});

	describe('when API call succeeds', () => {
		const pageNumber: number = 1;
		const pageSize: number = 10;
		const orderBy: SortingType = 'Title ASC';
		const filterByCategory: number = 1;

		it('should return all listings if there is no filter in place', async () => {
			// Arrange
			const listings: FetchListingsResponse = {
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

			mock.onGet('listings').reply(200, listings);

			// Act & Assert
			await expect(fetchListings(pageNumber, pageSize, orderBy)).resolves.not.toThrow(Error);
			await expect(fetchListings(pageNumber, pageSize, orderBy)).resolves.toEqual(listings.listings);
			expect(mock.history.get.every((request) => request.params.filterByCategory === undefined)).toBeTruthy();
		});

		it('should return all listings if there is a filter in place', async () => {
			// Arrange
			const listings: FetchListingsResponse = {
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

			mock.onGet('listings').reply(200, listings);

			// Act & Assert
			await expect(fetchListings(pageNumber, pageSize, orderBy, filterByCategory)).resolves.not.toThrow(Error);
			await expect(fetchListings(pageNumber, pageSize, orderBy, filterByCategory)).resolves.toEqual(listings.listings);
			expect(mock.history.get.every((request) => request.params.filterByCategory === filterByCategory)).toBeTruthy();
		});
	});
});
