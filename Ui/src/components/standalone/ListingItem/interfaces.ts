export interface ListingItemI {
	id: string;
	image: string;
	title: string;
	createdOn: Date;
	onClick: () => void;
}
