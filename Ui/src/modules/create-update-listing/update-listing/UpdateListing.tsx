import { FormContainer } from '../shared';
import { useUpdateListing } from './hooks';
import { UpdateListingProps } from './types';

const UpdateListing = ({ accessToken, id, initialValues }: UpdateListingProps) => {
	const { formik } = useUpdateListing(id, accessToken, initialValues);

	return (
		<FormContainer formik={formik} pageTitle='Update listing!' resetButtonText='Reset' submitButtonText='Update' />
	);
};

export default UpdateListing;
