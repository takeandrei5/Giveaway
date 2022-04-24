import { Divider, Flex } from '@chakra-ui/react';
import { Form, FormikProps, FormikProvider, useFormik } from 'formik';
import { GetServerSidePropsContext, NextPage, Redirect } from 'next';
import { NextRouter, useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { v4 as uuidv4 } from 'uuid';

import { Typography } from '../../components';
import { CreateListingButtonContainer } from '../../modules';
import { CategoryFormControl, DescriptionFormControl, ImagesFormControl } from '../../modules/create-listing';
import TitleFormControl from '../../modules/create-listing/TitleFormControl';
import { fetchAccessToken } from '../../utils/helpers';
import { createListing } from './apis';
import { CreateListingFormikValues, CreateListingPageProps, CreateListingRequest, ImageFormikValue } from './types';
import { validationSchema } from './validators';

const CreateListingPage: NextPage<CreateListingPageProps> = ({ accessToken }: CreateListingPageProps) => {
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
		initialValues: {
			title: '',
			description: '',
			category: 1,
			images: Array.from(Array(6)).map(
				(): ImageFormikValue => ({
					id: uuidv4(),
					url: '',
				})
			),
		},
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
							<CreateListingButtonContainer />
						</Flex>
					</Flex>
				</Form>
			</FormikProvider>
		</>
	);
};

export async function getServerSideProps(
	context: GetServerSidePropsContext
): Promise<{ props: CreateListingPageProps } | { redirect: Redirect }> {
	const accessToken: string | undefined = await fetchAccessToken(context);

	if (!accessToken) {
		return {
			redirect: {
				destination: '/listings',
				permanent: true,
			},
		};
	}

	return {
		props: {
			accessToken,
		},
	};
}

export default CreateListingPage;
