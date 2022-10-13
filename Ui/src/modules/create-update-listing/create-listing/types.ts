import { FormikProps } from 'formik';
import { FormikValues } from '../shared/types';

export type UseCreateListingResult = {
	formik: FormikProps<FormikValues>;
};
