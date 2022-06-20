import { createListing } from '@api/listings';
import { CreateListingRequest } from '@api/listings/types';
import { FormikProps, useFormik } from 'formik';
import { NextRouter, useRouter } from 'next/router';
import { useMutation } from 'react-query';

import { FormikValues, ImageFormikValue } from '../shared/types';
import { validationSchema } from '../shared/validators';
import INITIAL_VALUES from './constants';

const useCreateListing = (accessToken: string) => {
	const router: NextRouter = useRouter();

	const { mutate: createListingMutate } = useMutation(
		(data: CreateListingRequest) => createListing(accessToken, data),
		{
			onSuccess: () => {
				router.replace('/listings');
			},
			onError: (err) => {
				console.error(err);
				router.replace('/500');
			},
		}
	);

	const formik: FormikProps<FormikValues> = useFormik<FormikValues>({
		initialValues: INITIAL_VALUES,
		validationSchema,
		validateOnBlur: true,
		validateOnChange: false,
		onSubmit: (values: FormikValues) => {
			createListingMutate({
				title: values.title,
				description: values.description,
				category: values.category,
				images: values.images.filter(({ url }: ImageFormikValue) => !!url).map(({ url }: ImageFormikValue) => url),
			});
		},
	});

	return { formik };
};

export { useCreateListing };
