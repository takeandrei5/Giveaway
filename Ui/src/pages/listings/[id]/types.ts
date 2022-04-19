import { GetAccessTokenResult } from '@auth0/nextjs-auth0';

export type ListingDetailsPageProps = {
	accessTokenResult: GetAccessTokenResult;
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
