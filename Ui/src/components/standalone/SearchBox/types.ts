import { FormikValues } from 'formik';

export interface FormikInitialValues extends FormikValues {
	searchByField: string;
}
