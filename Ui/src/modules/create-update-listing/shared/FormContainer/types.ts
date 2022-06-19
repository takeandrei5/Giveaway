import { FormikProps } from 'formik';

import { FormikValues } from '../types';

export type FormContainerProps = {
	formik: FormikProps<FormikValues>;
	pageTitle: string;
	resetButtonText: string;
	submitButtonText: string;
};
