import { FormikValues } from 'formik';

export type CreateListingFormikValues = FormikValues & {
	title: string;
	description: string;
	category: number;
	images: ImageFormikValue[];
};

export type ImageFormikValue = {
	id: string;
	url: string;
};

export type CreateListingPageProps = { accessToken: string };

export type CreateListingRequest = Omit<CreateListingFormikValues, 'images'> & { images: string[] };
