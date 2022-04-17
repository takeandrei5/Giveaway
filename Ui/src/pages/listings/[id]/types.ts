export type ListingPageProps = {
	listingInfo: ListingInformation;
	ownerInfo: OwnerInformation;
};

type ListingInformation = {
	id: string;
	title: string;
	description: string;
	category: number;
	createdAt: Date;
	images: string[];
};

type OwnerInformation = {
	email: string;
	name: string;
	image: string;
};

export type FetchListingDetailsResponse = ListingPageProps;
