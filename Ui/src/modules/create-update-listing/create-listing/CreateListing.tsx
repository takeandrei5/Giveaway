import { FormContainer } from '../shared';
import { useCreateListing } from './hooks';
import { UseCreateListingResult } from './types';

const CreateListing = (): JSX.Element => {
	const { formik }: UseCreateListingResult = useCreateListing();

	return <FormContainer formik={formik} pageTitle='Create a listing!' resetButtonText='Clear' submitButtonText='Submit' />;
};

export default CreateListing;
