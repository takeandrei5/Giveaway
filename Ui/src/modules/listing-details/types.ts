import { ListingInformation, OwnerInformation } from '@api/webapi/listings/types';

export type ListingDetailsProps = { id: string };

export type UseFetchListingDetailsResult = {
	isLoading: boolean;
	listingInfo: ListingInformation;
	ownerInfo: OwnerInformation;
	handleBackButtonClick: () => void;
	handleDeleteListingButtonClick: () => void;
	handleUpdateListingButtonClick: () => void;
};
