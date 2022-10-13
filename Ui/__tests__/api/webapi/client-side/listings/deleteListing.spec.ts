import { deleteListing } from '@api/webapi/listings/client-side';
import { DELETE_LISTING_URL } from '@routes/nextapi/listings';
import { axiosInstance } from '@utils/axios';
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

describe('deleteListing', () => {
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
			mock.onDelete(`${DELETE_LISTING_URL}/${listingId}`).reply(404);

			// Assert
			await expect(deleteListing(listingId)).rejects.toThrow(NotFoundError);
			await expect(deleteListing(listingId)).rejects.toThrow(new NotFoundError(`Listing ${listingId} not found.`));
		});

		it('should throw a NotFoundError on status 404', async () => {
			// Arrange
			mock.onDelete(`listings/${listingId}`).reply(404);

			// Assert
			await expect(deleteListing(listingId)).rejects.toThrow(NotFoundError);
			await expect(deleteListing(listingId)).rejects.toThrow(new NotFoundError(`Listing ${listingId} not found.`));
		});
	});

	describe('when API call succeeds', () => {
		it('should return nothing', async () => {
			// Arrange
			mock.onDelete(`${DELETE_LISTING_URL}/${listingId}`).reply(204);

			// Assert
			await expect(deleteListing(listingId)).resolves.not.toThrow(NotFoundError);
			await expect(deleteListing(listingId)).resolves.toBe(undefined);
		});
	});
});
