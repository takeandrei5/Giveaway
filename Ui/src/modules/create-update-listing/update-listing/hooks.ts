import { FormikProps, useFormik } from 'formik';
import { NextRouter, useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { v4 as uuidv4 } from 'uuid';

import { UpdateListingRequest } from '../../../api/listings/types';
import updateListing from '../../../api/listings/updateListing';
import { UpdateListingInitialValues } from '../../../pages/update-listing/[id]/types';
import { MAX_IMAGES } from '../../../utils/constants';
import { FormikValues, ImageFormikValue } from '../shared/types';
import { validationSchema } from '../shared/validators';
import { NotFoundError } from '../../../utils/errors';

const useUpdateListing = (id: string, accessToken: string, initialValues: UpdateListingInitialValues) => {
	const router: NextRouter = useRouter();

	const { mutate: updateListingMutate } = useMutation(
		(data: UpdateListingRequest) => updateListing(id, accessToken, data),
		{
			onSuccess: () => router.replace('/listings'),
			onError: (err) => {
				if (err instanceof NotFoundError) {
					router.replace('/404');
					return;
				}
				router.replace('/500');
			},
		}
	);

	const fillArray = (): string[] => {
		const newArray = [...initialValues.images];
		while (newArray.length < MAX_IMAGES) {
			newArray.push('');
		}

		return newArray;
	};

	const formik: FormikProps<FormikValues> = useFormik<FormikValues>({
		initialValues: {
			title: initialValues.title,
			description: initialValues.description,
			category: initialValues.category,
			images: fillArray().map(
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
