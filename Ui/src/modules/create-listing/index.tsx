import { Divider, Flex } from '@chakra-ui/react';
import { Form, FormikProps, FormikProvider, useFormik } from 'formik';
import { NextRouter, useRouter } from 'next/router';
import { useMutation } from 'react-query';

import { Typography } from '../../components';
import { createListing } from './apis';
import { ButtonContainer } from './ButtonContainer';
import { CategoryFormControl } from './CategoryFormControl';
import { INITIAL_VALUES } from './constants';
import { DescriptionFormControl } from './DescriptionFormControl';
import { ImagesFormControl } from './ImagesFormControl';
import { TitleFormControl } from './TitleFormControl';
import { CreateListingFormikValues, CreateListingModuleProps, CreateListingRequest, ImageFormikValue } from './types';
import { validationSchema } from './validators';

const CreateListingModule = ({ accessToken }: CreateListingModuleProps) => {
	const router: NextRouter = useRouter();

	const { mutate: createListingMutate } = useMutation(
		(data: CreateListingRequest) => createListing(accessToken, data),
		{
			onSuccess: () => router.replace('/listings'),
			onError: (err) => {
				console.error(err);
				router.replace('/500');
			},
		}
	);

	const formik: FormikProps<CreateListingFormikValues> = useFormik<CreateListingFormikValues>({
		initialValues: INITIAL_VALUES,
		validationSchema,
		validateOnBlur: true,
		validateOnChange: false,
		onSubmit: (values: CreateListingFormikValues) =>
			createListingMutate({
				title: values.title,
				description: values.description,
				category: values.category,
				images: values.images.filter(({ url }: ImageFormikValue) => !!url).map(({ url }: ImageFormikValue) => url),
			}),

		onReset: () => {
			formik.setFieldValue('images', INITIAL_VALUES.images);
		},
	});

	return (
		<>
			<Typography variant='h1'>Create a listing!</Typography>
			<FormikProvider value={formik}>
				<Form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
					<Flex
						direction='column'
						borderRadius='2xl'
						bgColor='white'
						marginTop='1.25rem'
						padding='1.5rem'
						height='100%'
						maxWidth='100%'
						rowGap='0.25rem'>
						<Typography variant='h3'>Be as specific as you can!</Typography>
						<Divider />
						<Flex direction='column' marginTop='0.5rem' rowGap='1rem'>
							<TitleFormControl name='title' />
							<CategoryFormControl name='category' />
							<ImagesFormControl name='images' />
							<DescriptionFormControl name={'description'} />
							<ButtonContainer />
						</Flex>
					</Flex>
				</Form>
			</FormikProvider>
		</>
	);
};

export default CreateListingModule;
