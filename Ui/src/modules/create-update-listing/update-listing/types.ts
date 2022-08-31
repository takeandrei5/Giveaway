import { FormikValues } from '../shared/types';

type UpdateListingInitialValues = Omit<FormikValues, 'images'> & { images: string[] };

export type UpdateListingProps = {
	accessToken: string;
	id: string;
	initialValues: UpdateListingInitialValues;
};
