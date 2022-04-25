import { DehydratedState } from '../../../utils/types';

export type ListingDetailsPageProps = { id: string } & DehydratedState & {
		accessToken: string | undefined;
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
