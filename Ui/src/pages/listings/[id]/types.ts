export type ListingDetailsPageProps = {
	listingInfo: ListingInformation;
	ownerInfo: OwnerInformation;
};

export type ListingInformation = {
	id: string;
	title: string;
	description: string;
	category: number;
	createdAt: Date;
	images: string[];
};

export type OwnerInformation = {
	email: string;
	name: string;
	image: string;
};

export type FetchListingDetailsResponse = ListingDetailsPageProps;
