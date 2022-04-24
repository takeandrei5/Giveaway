import { FormikValues } from 'formik';

export type FormControl = { name: string };

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

export type CreateListingRequest = Omit<CreateListingFormikValues, 'images'> & { images: string[] };

export type CreateListingModuleProps = { accessToken: string };
