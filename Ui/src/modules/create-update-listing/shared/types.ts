import { FormikProps, FormikValues as FormikDefaultValues } from 'formik';

export type FormControl = { name: string };

export type FormikValues = FormikDefaultValues & {
	title: string;
	description: string;
	category: number;
	images: ImageFormikValue[];
};

export type ImageFormikValue = {
	id: string;
	url: string;
};

export type FormContainerProps = {
	formik: FormikProps<FormikValues>;
	pageTitle: string;
};
