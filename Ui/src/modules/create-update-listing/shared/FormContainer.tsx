import { Divider, Flex } from '@chakra-ui/react';
import { Typography } from 'components';
import { Form, FormikProvider } from 'formik';

import { ButtonContainer } from './ButtonContainer';
import { CategoryFormControl } from './CategoryFormControl';
import { DescriptionFormControl } from './DescriptionFormControl';
import { ImagesFormControl } from './ImagesFormControl';
import { TitleFormControl } from './TitleFormControl';
import { FormContainerProps } from './types';

const FormContainer = ({ formik, pageTitle, resetButtonText, submitButtonText }: FormContainerProps): JSX.Element => (
	<FormikProvider value={formik}>
		<Typography variant='h1'>{pageTitle}</Typography>
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
					<ButtonContainer resetButtonText={resetButtonText} submitButtonText={submitButtonText} />
				</Flex>
			</Flex>
		</Form>
	</FormikProvider>
);

export default FormContainer;
