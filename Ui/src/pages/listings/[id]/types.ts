import { GetAccessTokenResult } from '@auth0/nextjs-auth0';
import { DehydratedState } from '../../../utils/types';

export type ListingDetailsPageProps = { id: string } & DehydratedState & {
		accessTokenResult: GetAccessTokenResult;
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

export type FetchListingDetailsResponse = { listingInfo: ListingInformation } & { ownerInfo: OwnerInformation };
