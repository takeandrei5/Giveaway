import { createListing } from '@api/listings';
import axiosInstance from '@utils/axios';
import { NotFoundError } from '@utils/errors';
import MockAdapter from 'axios-mock-adapter';

import { CreateListingRequest } from '../../../src/api/listings/types';

jest.mock('next/config', () => () => ({
	publicRuntimeConfig: {
		apiUrl: 'http://localhost/',
	},
	serverRuntimeConfig: {
		apiUrl: 'http://localhost/',
	},
}));

describe('createListing', () => {
	let mock: MockAdapter;
	const accessToken: string = Math.random().toString(32);

	beforeAll(() => {
		mock = new MockAdapter(axiosInstance);
	});

	afterEach(() => {
		mock.reset();
	});

	describe('when API call succeeds', () => {
		it('should return nothing', async () => {
			// Arrange
			const newListingInfoData: CreateListingRequest = {
				title: 'test-title',
				description: 'test-description',
				category: 0,
				images: ['test-image-url'],
			};
			mock.onPost('listings').reply(204);

			// Assert
			await expect(createListing(accessToken, newListingInfoData)).resolves.not.toThrow(NotFoundError);
			await expect(createListing(accessToken, newListingInfoData)).resolves.toEqual(undefined);

			expect(mock.history.post.every((request) => request.data === JSON.stringify(newListingInfoData))).toBeTruthy();
		});
	});
});
