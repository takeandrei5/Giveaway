import { FormContainer } from '../shared';
import { useUpdateListing } from './hooks';
import { UpdateListingModuleProps } from './types';

const UpdateListingModule = ({ accessToken, initialValues }: UpdateListingModuleProps) => {
	const { formik } = useUpdateListing(accessToken, initialValues);

	return <FormContainer formik={formik} pageTitle='Update listing!' />;
};

export default UpdateListingModule;
