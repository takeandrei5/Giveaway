import { FormikProps, useFormik } from 'formik';
import { NextRouter, useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { v4 as uuidv4 } from 'uuid';

import { UpdateListingRequest } from '../../../api/listings/types';
import updateListing from '../../../api/listings/updateListing';
import { UpdateListingInitialValues } from '../../../pages/update-listing/[id]/types';
import { FormikValues, ImageFormikValue } from '../shared/types';
import { validationSchema } from '../shared/validators';

const useUpdateListing = (accessToken: string, initialValues: UpdateListingInitialValues) => {
	const router: NextRouter = useRouter();

	const { mutate: updateListingMutate } = useMutation(
		(data: UpdateListingRequest) => updateListing(accessToken, data),
		{
			onSuccess: () => router.replace('/listings'),
			onError: (err) => {
				console.error(err);
				router.replace('/500');
			},
		}
	);

	const formik: FormikProps<FormikValues> = useFormik<FormikValues>({
		initialValues: {
			title: initialValues.title,
			description: initialValues.description,
			category: initialValues.category,
			images: initialValues.images.map(
				(image: string): ImageFormikValue => ({
					id: uuidv4(),
					url: image,
				})
			),
		},
		validationSchema,
		validateOnBlur: true,
		validateOnChange: false,
		onSubmit: (values: FormikValues) =>
			updateListingMutate({
				title: values.title,
				description: values.description,
				category: values.category,
				images: values.images.filter(({ url }: ImageFormikValue) => !!url).map(({ url }: ImageFormikValue) => url),
			}),
	});

	return { formik };
};

export { useUpdateListing };
