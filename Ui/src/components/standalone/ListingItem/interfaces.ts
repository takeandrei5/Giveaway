export interface ListingItemI {
	id: string;
	image: string;
	title: string;
	createdAt: Date;
	onClick: () => void;
}
