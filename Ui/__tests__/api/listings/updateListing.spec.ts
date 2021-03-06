import { updateListing } from '@api/listings';
import { UpdateListingRequest } from '@api/listings/types';
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

describe('updateListing', () => {
	let mock: MockAdapter;
	const listingId: string = Math.random().toString(32);
	const accessToken: string = Math.random().toString(32);
	const updateListingRequest: UpdateListingRequest = {
		title: 'new-test-tile',
		category: 0,
		description: 'new-test-description',
		images: ['new-test-image-url'],
	};

	beforeAll(() => {
		mock = new MockAdapter(axiosInstance);
	});

	afterEach(() => {
		mock.reset();
	});

	describe('when API call fails', () => {
		it('should throw a NotFoundError on status 400', async () => {
			// Arrange
			mock.onPut(`listings/${listingId}`, updateListingRequest).reply(400);

			// Assert
			await expect(updateListing(listingId, accessToken, updateListingRequest)).rejects.toThrow(NotFoundError);
			await expect(updateListing(listingId, accessToken, updateListingRequest)).rejects.toThrow(
				new NotFoundError(`Listing ${listingId} not found.`)
			);
		});

		it('should throw a NotFoundError on status 404', async () => {
			// Arrange
			mock.onPut(`listings/${listingId}`, updateListingRequest).reply(404);

			// Assert
			await expect(updateListing(listingId, accessToken, updateListingRequest)).rejects.toThrow(NotFoundError);
			await expect(updateListing(listingId, accessToken, updateListingRequest)).rejects.toThrow(
				new NotFoundError(`Listing ${listingId} not found.`)
			);
		});
	});

	describe('when API call succeeds', () => {
		it('should return nothing', async () => {
			// Arrange
			mock.onPut(`listings/${listingId}`, updateListingRequest).reply(204);

			// Assert
			await expect(updateListing(listingId, accessToken, updateListingRequest)).resolves.not.toThrow(NotFoundError);
			await expect(updateListing(listingId, accessToken, updateListingRequest)).resolves.toBe(undefined);
		});
	});
});
