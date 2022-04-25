import { PaginatedResult } from '../../utils/types';

export type ItemData = { id: string; image: string; title: string; createdAt: Date };

export type CreateListingRequest = {
	title: string;
	description: string;
	category: number;
	images: string[];
};

export type UpdateListingRequest = {
	title: string;
	description: string;
	category: number;
	images: string[];
};

export interface FetchListingsResponse {
	listings: PaginatedResult<ItemData>;
}

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
