export type InformationBoxProps = {
	title: string;
	description: string;
	createdAt: Date;
};

export type ImageSliderProps = {
	images: string[];
};

export type OwnerInformationProps = {
	email: string;
	name: string;
	image: string;
};

export type DeleteListingProps = {
	ownerEmail: string;
	onClick: () => void;
};
