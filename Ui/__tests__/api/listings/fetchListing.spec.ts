import { fetchListing } from '@api/listings';
import { FetchListingDetailsResponse } from '@api/listings/types';
import axiosInstance from '@utils/axios';
import { NotFoundError } from '@utils/errors';
import MockAdapter from 'axios-mock-adapter';

jest.mock('next/config', () => () => ({
	publicRuntimeConfig: {
		apiUrl: 'http://localhost/',
	},
	serverRuntimeConfig: {
		apiUrl: 'http://localhost/',
	},
}));

describe('fetchListing', () => {
	let mock: MockAdapter;
	const listingId: string = Math.random().toString(32);

	beforeAll(() => {
		mock = new MockAdapter(axiosInstance);
	});

	afterEach(() => {
		mock.reset();
	});

	describe('when API call fails', () => {
		it('should throw a NotFoundError on status 400', async () => {
			// Arrange
			mock.onGet(`listings/${listingId}`).reply(400);

			// Assert
			await expect(fetchListing(listingId)).rejects.toThrow(NotFoundError);
			await expect(fetchListing(listingId)).rejects.toThrow(new NotFoundError(`Listing ${listingId} not found.`));
		});

		it('should throw a NotFoundError on status 404', async () => {
			// Arrange
			mock.onGet(`listings/${listingId}`).reply(404);

			// Assert
			await expect(fetchListing(listingId)).rejects.toThrow(NotFoundError);
			await expect(fetchListing(listingId)).rejects.toThrow(new NotFoundError(`Listing ${listingId} not found.`));
		});
	});

	describe('when API call succeeds', () => {
		it('should return a listing', async () => {
			// Arrange
			const listingInfo: FetchListingDetailsResponse = {
				listingInfo: {
					title: 'test title',
					category: 0,
					createdAt: new Date(),
					description: 'test description',
					id: listingId,
					images: ['test-image-url'],
				},
				ownerInfo: {
					email: 'test-email@test.com',
					name: 'test-name',
					image: 'test-image-url',
				},
			};

			mock.onGet(`listings/${listingId}`).reply(200, listingInfo);

			// Assert
			await expect(fetchListing(listingId)).resolves.not.toThrow(NotFoundError);
			await expect(fetchListing(listingId)).resolves.toEqual(listingInfo);
		});
	});
});
