import { Divider, Flex, useColorModeValue } from '@chakra-ui/react';
import { ButtonPrimary, Typography } from '@components';
import { Form, FormikProvider } from 'formik';
import { NextRouter, useRouter } from 'next/router';
import { GrFormPrevious } from 'react-icons/gr';
import { MdArrowBackIosNew } from 'react-icons/md';

import { ButtonContainer } from '../ButtonContainer';
import { CategoryFormControl } from '../CategoryFormControl';
import { DescriptionFormControl } from '../DescriptionFormControl';
import { ImagesFormControl } from '../ImagesFormControl';
import { TitleFormControl } from '../TitleFormControl';
import { FormContainerProps } from './types';

const FormContainer = ({ formik, pageTitle, resetButtonText, submitButtonText }: FormContainerProps): JSX.Element => {
	const router: NextRouter = useRouter();

	const lightOrDarkColor: 'light' | 'dark' = useColorModeValue('light', 'dark');

	return (
		<FormikProvider value={formik}>
			<Flex flex={1} flexDirection='column' gap={2}>
				<Typography variant='h1' color={`primary.${lightOrDarkColor}`}>
					{pageTitle}
				</Typography>
				<ButtonPrimary
					backgroundColor={`primary.${lightOrDarkColor}`}
					height='fit-content'
					leftIcon={<MdArrowBackIosNew color='white' size='1rem' />}
					onClick={() => router.push('/listings')}
					width='fit-content'>
					<Typography variant='button' color={lightOrDarkColor}>
						Back
					</Typography>
				</ButtonPrimary>
				<Flex
					__css={{
						'& > form': {
							height: '100%',
							width: '100%',
						},
					}}
					flex={1}>
					<Form onSubmit={formik.handleSubmit} onReset={formik.handleReset} noValidate>
						<Flex
							backgroundColor='white'
							borderRadius='2xl'
							boxShadow='base'
							direction='column'
							height='100%'
							padding={6}
							gap={2}>
							<Typography variant='h3' color={`primary.${lightOrDarkColor}`}>
								Be as specific as you can!
							</Typography>
							<TitleFormControl name='title' />
							<CategoryFormControl name='category' />
							<ImagesFormControl name='images' />
							<DescriptionFormControl name={'description'} />
							<ButtonContainer resetButtonText={resetButtonText} submitButtonText={submitButtonText} />
						</Flex>
					</Form>
				</Flex>
			</Flex>
		</FormikProvider>
	);
};
export default FormContainer;
