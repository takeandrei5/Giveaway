import { FormContainer } from '../shared';
import { useCreateListing } from './hooks';
import { CreateListingModuleProps } from './types';

const CreateListingModule = ({ accessToken }: CreateListingModuleProps) => {
	const { formik } = useCreateListing(accessToken);

	return (
		<FormContainer formik={formik} pageTitle='Create a listing!' resetButtonText='Clear' submitButtonText='Submit' />
	);
};

export default CreateListingModule;
