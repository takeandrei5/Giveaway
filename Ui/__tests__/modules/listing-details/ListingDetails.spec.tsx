import { useUser } from '@auth0/nextjs-auth0';
import { ListingDetails } from '@modules/listing-details';
import { useFetchListingDetails } from '@modules/listing-details/hooks';
import { ListingDetailsProps, UseFetchListingDetailsResult } from '@modules/listing-details/types';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/router';
import { TEST_IMAGE } from '__tests__/constants';
import { ListingInformation, OwnerInformation } from '@api/webapi/listings/types';
import { noop } from '@utils/constants';

jest.mock('dateformat', () => jest.fn());

jest.mock('next/router', () => ({
	...jest.requireActual('next/router'),
	useRouter: jest.fn(),
}));

jest.mock('@modules/listing-details/hooks', () => ({
	useFetchListingDetails: jest.fn<UseFetchListingDetailsResult, [id: string]>(),
}));

jest.mock('@auth0/nextjs-auth0', () => ({ ...jest.requireActual('@auth0/nextjs-auth0'), useUser: jest.fn() }));

describe('ListingDetails', () => {
	const listingInfo: ListingInformation = {
		id: 'listing-id',
		title: 'listing-title',
		description: 'listing-description',
		category: 0,
		createdAt: new Date('2020-01-01'),
		images: [TEST_IMAGE],
	};

	(useUser as unknown as jest.Mock).mockImplementation(() => ({ user: { name: 'John Doe' } }));

	const props: ListingDetailsProps = {
		id: 'test-id',
	};

	it('should match snapshot', () => {
		// Arrange
		(useFetchListingDetails as unknown as jest.Mock<any, [id: string]>).mockImplementation((id: string) => ({
			isLoading: false,
			listingInfo,
			ownerInfo: {},
		}));

		// Act
		const { container } = render(<ListingDetails {...props} />);

		// Assert
		expect(container).toMatchSnapshot();
	});

	describe('when the buttons are clicked', () => {
		let route = '';

		beforeAll(() => {
			(useRouter as unknown as jest.Mock).mockImplementation(() => ({
				route,
				push: jest.fn((value: string) => (route = value)),
			}));
		});

		beforeEach(() => {
			route = '';
		});

		it('should redirect user to `/listing` page if the back button is clicked', async () => {
			// Arrange
			const handleBackButtonClickMock = jest.fn(() => {
				route = '/listings';
			});

			(useFetchListingDetails as unknown as jest.Mock<UseFetchListingDetailsResult, [id: string]>).mockImplementation((id: string) => ({
				isLoading: false,
				listingInfo,
				ownerInfo: {} as OwnerInformation,
				handleBackButtonClick: handleBackButtonClickMock,
				handleDeleteListingButtonClick: noop,
				handleUpdateListingButtonClick: noop,
			}));

			const { getByText } = render(<ListingDetails {...props} />);

			// Act
			await userEvent.click(getByText('Back'));

			// Assert
			expect(route).toBe('/listings');
			expect(handleBackButtonClickMock).toHaveBeenCalledTimes(1);
		});

		it('should redirect user to `/update-listing/${id}` page if the update listing button is clicked', async () => {
			// Arrange
			const handleUpdateButtonClickMock: jest.Mock<void, []> = jest.fn(() => {
				route = `/update-listing/${props.id}`;
			});

			(useFetchListingDetails as unknown as jest.Mock<any, [id: string, isAccessTokenLoaded: boolean]>).mockImplementation(
				(id: string) => ({
					isLoading: false,
					listingInfo,
					ownerInfo: {} as OwnerInformation,
					handleBackButtonClick: noop,
					handleDeleteListingButtonClick: noop,
					handleUpdateListingButtonClick: handleUpdateButtonClickMock,
				})
			);

			const { getByText } = render(<ListingDetails {...props} />);

			// Act
			await userEvent.click(getByText('Update listing'));

			// Assert
			expect(route).toBe(`/update-listing/${props.id}`);
			expect(handleUpdateButtonClickMock).toHaveBeenCalledTimes(1);
		});

		it('should execute `deleteListingMutate` if the delete listing button is clicked', async () => {
			// Arrange
			const handleDeleteButtonClickMock: jest.Mock<void, []> = jest.fn(noop);

			(useFetchListingDetails as unknown as jest.Mock<any, [id: string, isAccessTokenLoaded: boolean]>).mockImplementation(
				(id: string) => ({
					isLoading: false,
					listingInfo,
					ownerInfo: {} as OwnerInformation,
					handleBackButtonClick: noop,
					handleDeleteListingButtonClick: handleDeleteButtonClickMock,
					handleUpdateListingButtonClick: noop,
				})
			);

			const { getByText } = render(<ListingDetails {...props} />);

			// Act
			await userEvent.click(getByText('Delete listing'));

			// Assert
			expect(handleDeleteButtonClickMock).toHaveBeenCalledTimes(1);
		});
	});
});
