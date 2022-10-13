import { FormikValues } from '../shared/types';

type UpdateListingInitialValues = Omit<FormikValues, 'images'> & { images: string[] };

export type UpdateListingProps = {
	id: string;
	initialValues: UpdateListingInitialValues;
};
