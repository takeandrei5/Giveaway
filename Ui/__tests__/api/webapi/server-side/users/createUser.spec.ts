import { createUser } from '@api/webapi/users/server-side';
import { CREATE_USER_URL } from '@routes/webapi/users';
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

describe('createUser', () => {
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
			mock.onPost(CREATE_USER_URL).reply(204);

			// Assert
			await expect(createUser(accessToken)).resolves.toEqual(undefined);
		});
	});
});
