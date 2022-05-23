import { FormContainer } from '../shared';
import { useUpdateListing } from './hooks';
import { UpdateListingModuleProps } from './types';

const UpdateListingModule = ({ accessToken, id, initialValues }: UpdateListingModuleProps) => {
	const { formik } = useUpdateListing(id, accessToken, initialValues);

	return (
		<FormContainer formik={formik} pageTitle='Update listing!' resetButtonText='Reset' submitButtonText='Update' />
	);
};

export default UpdateListingModule;
