import { deleteListing, fetchListing } from '@api/webapi/listings/client-side';
import { useFetchListingDetails } from '@modules/listing-details/hooks';
import { renderHook } from '@testing-library/react-hooks';
import { NotFoundError } from '@utils/errors';
import { useRouter } from 'next/router';
import { QueryClientWrapper } from '__tests__/wrappers';
import { FetchListingDetailsResponse } from '@api/webapi/listings/types';

jest.mock('next/router', () => ({
	...jest.requireActual('next/router'),
	useRouter: jest.fn(),
}));

jest.mock('@api/webapi/listings/client-side', () => ({
	...jest.requireActual('@api/webapi/listings/client-side'),
	fetchListing: jest.fn(),
	deleteListing: jest.fn(),
}));

jest.mock('next/config', () => () => ({
	publicRuntimeConfig: {
		apiUrl: 'http://localhost/',
	},
	serverRuntimeConfig: {
		apiUrl: 'http://localhost/',
	},
}));

describe('useFetchListingDetails', () => {
	const id: string = 'test-id';
	const fetchListingDetailsResponse: FetchListingDetailsResponse = {
		listingInfo: {
			title: 'test title',
			category: 0,
			createdAt: new Date(),
			description: 'test description',
			id,
			images: ['test-image-url'],
		},
		ownerInfo: {
			email: 'test-email@test.com',
			name: 'test-name',
			image: 'test-image-url',
		},
	};

	let route = '';

	beforeEach(() => {
		route = '';
		(useRouter as unknown as jest.Mock).mockImplementation(() => ({
			route,
			replace: jest.fn((url: string) => (route = url)),
		}));
	});

	describe('useQuery', () => {
		it('should fetch data correctly', async () => {
			// Arrange
			(fetchListing as unknown as jest.Mock).mockImplementation((id: string) => ({ ...fetchListingDetailsResponse }));

			// Act
			const { result, waitForNextUpdate } = renderHook(() => useFetchListingDetails(id), {
				wrapper: QueryClientWrapper,
			});

			await waitForNextUpdate();

			// Assert
			expect(result.current.isLoading).toBe(false);
			expect(result.current.listingInfo).toEqual(fetchListingDetailsResponse.listingInfo);
			expect(result.current.ownerInfo).toEqual(fetchListingDetailsResponse.ownerInfo);
		});

		it('should redirect to `/404` if data is falsy', async () => {
			// Arrange
			(fetchListing as unknown as jest.Mock).mockImplementation((id: string) => undefined);

			// Act
			const { result, waitForNextUpdate } = renderHook(() => useFetchListingDetails(id), {
				wrapper: QueryClientWrapper,
			});

			await waitForNextUpdate();

			// Assert
			expect(result.current.isLoading).toBe(false);
			expect(route).toBe('/404');
		});

		it('should redirect to `/404` if error', async () => {
			// Arrange
			(fetchListing as unknown as jest.Mock).mockImplementation((id: string) => Promise.reject());

			// Act
			const { result, waitForNextUpdate } = renderHook(() => useFetchListingDetails(id), {
				wrapper: QueryClientWrapper,
			});

			await waitForNextUpdate();

			// Assert
			expect(result.current.isLoading).toBe(false);
			expect(route).toBe('/404');
		});
	});

	describe('useMutation', () => {
		it('should redirect to `/listings` if mutation is successful', async () => {
			// Arrange
			(deleteListing as unknown as jest.Mock).mockImplementation((id: string) => Promise.resolve());

			// Act
			const { result, waitForNextUpdate } = renderHook(() => useFetchListingDetails(id), {
				wrapper: QueryClientWrapper,
			});

			result.current.handleDeleteListingButtonClick();

			await waitForNextUpdate();

			// Assert
			expect(route).toBe('/listings');
		});

		it('should redirect to `/404` if mutation is not successful and the error is a NotFound type of error', async () => {
			// Arrange
			(deleteListing as unknown as jest.Mock).mockImplementation(
				(id: string) =>
					new Promise(() => {
						throw new NotFoundError('test-not-found-error');
					})
			);

			// Act
			const { result, waitForNextUpdate } = renderHook(() => useFetchListingDetails(id), {
				wrapper: QueryClientWrapper,
			});

			result.current.handleDeleteListingButtonClick();

			await waitForNextUpdate();

			// Assert
			expect(route).toBe('/404');
		});

		it('should redirect to `/500` if mutation is not successful and the error is not a NotFound type of error', async () => {
			// Arrange
			(deleteListing as unknown as jest.Mock).mockImplementation((id: string) => Promise.reject());

			// Act
			const { result, waitForNextUpdate } = renderHook(() => useFetchListingDetails(id), {
				wrapper: QueryClientWrapper,
			});

			result.current.handleDeleteListingButtonClick();

			await waitForNextUpdate();

			// Assert
			expect(route).toBe('/500');
		});
	});
});
