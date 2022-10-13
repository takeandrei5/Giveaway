import { ForbiddenError, NotFoundError } from '@utils/errors';
import { tryFetchQuery } from '@utils/helpers';
import queryClient from '@utils/queryClient';

describe('Helpers', () => {
	describe('tryFetchQuery', () => {
		it('should call fetchQuery successfully', async () => {
			// Arrange
			const fetchQueryMock = jest.spyOn(queryClient, 'fetchQuery');

			// Act
			await tryFetchQuery(['test'], () => Promise.resolve());

			// Assert
			expect(fetchQueryMock).toHaveBeenCalledTimes(1);
		});

		it('should return correct object if a NotFoundError is thrown', async () => {
			// Arrange
			const expectedRedirectResult = {
				redirect: {
					permanent: true,
					destination: '/404',
				},
			};

			// Act
			const tryFetchQueryResult = await tryFetchQuery(
				['test'],
				() =>
					new Promise(() => {
						throw new NotFoundError('test-not-found');
					})
			);

			// Assert
			expect(tryFetchQueryResult).toEqual(expectedRedirectResult);
		});

		it('should return correct object if a ForbiddenError is thrown', async () => {
			// Arrange
			const expectedRedirectResult = {
				redirect: {
					permanent: true,
					destination: '/403',
				},
			};

			// Act
			const tryFetchQueryResult = await tryFetchQuery(
				['test'],
				() =>
					new Promise(() => {
						throw new ForbiddenError('test-forbidden');
					})
			);

			// Assert
			expect(tryFetchQueryResult).toEqual(expectedRedirectResult);
		});

		it('should return correct object if a generic Error is thrown', async () => {
			// Arrange
			const expectedRedirectResult = {
				redirect: {
					permanent: true,
					destination: '/500',
				},
			};

			// Act
			const tryFetchQueryResult = await tryFetchQuery(
				['test'],
				() =>
					new Promise(() => {
						throw new Error('test-forbidden');
					})
			);

			// Assert
			expect(tryFetchQueryResult).toEqual(expectedRedirectResult);
		});
	});
});
