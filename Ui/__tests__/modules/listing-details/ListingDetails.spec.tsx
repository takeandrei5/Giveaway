import { useUser } from '@auth0/nextjs-auth0';
import { ListingDetails } from '@modules/listing-details';
import { useFetchListingDetails } from '@modules/listing-details/hooks';
import { ListingDetailsProps } from '@modules/listing-details/types';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useGetAccessToken } from '@utils/hooks';
import { useRouter } from 'next/router';
import { TEST_IMAGE } from '__tests__/constants';
import { ListingInformation } from '../../../src/api/listings/types';

jest.mock('dateformat', () => jest.fn());

jest.mock('next/router', () => ({
	...jest.requireActual('next/router'),
	useRouter: jest.fn(),
}));

jest.mock('@utils/hooks', () => ({
	useGetAccessToken: jest.fn(),
}));

jest.mock('@modules/listing-details/hooks', () => ({
	useFetchListingDetails: jest.fn<any, [id: string, isAccessTokenLoaded: boolean]>(),
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

	const accessTokenFetched: boolean = true;
	const deleteListingMutateMock = jest.fn();

	(useGetAccessToken as unknown as jest.Mock).mockImplementation(() => ({
		isFetched: accessTokenFetched,
		data: 'access-token',
	}));

	(useUser as unknown as jest.Mock).mockImplementation(() => ({ user: { name: 'John Doe' } }));

	(useFetchListingDetails as unknown as jest.Mock<any, [id: string, isAccessTokenLoaded: boolean]>).mockImplementation(
		(id: string, isAccessTokenFetched: boolean) => ({
			isLoading: false,
			listingInfo,
			ownerInfo: {},
			deleteListingMutate: deleteListingMutateMock,
		})
	);

	const props: ListingDetailsProps = {
		id: 'test-id',
	};

	it('should match snapshot', () => {
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
			const { getByText } = render(<ListingDetails {...props} />);

			// Act
			await userEvent.click(getByText('Back'));

			// Assert
			expect(route).toBe('/listings');
		});

		it('should redirect user to `/update-listing/${id}` page if the update listing button is clicked', async () => {
			// Arrange
			const { getByText } = render(<ListingDetails {...props} />);

			// Act
			await userEvent.click(getByText('Update listing'));

			// Assert
			expect(route).toBe(`/update-listing/${props.id}`);
		});

		it('should execute `deleteListingMutate` if the delete listing button is clicked', async () => {
			// Arrange
			const { getByText } = render(<ListingDetails {...props} />);

			// Act
			await userEvent.click(getByText('Delete listing'));

			// Assert
			expect(deleteListingMutateMock).toHaveBeenCalledTimes(1);
		});
	});
});
