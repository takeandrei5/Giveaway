import { Skeleton } from 'components';
import { useGetAccessToken } from 'utils/hooks';

import { FormContainer } from '../shared';
import { useCreateListing } from './hooks';

const CreateListingModule = () => {
	const { isFetched, data } = useGetAccessToken();
	const { formik } = useCreateListing(data!);

	return (
		<Skeleton borderRadius='2xl' isLoaded={isFetched}>
			<FormContainer formik={formik} pageTitle='Create a listing!' resetButtonText='Clear' submitButtonText='Submit' />
		</Skeleton>
	);
};

export default CreateListingModule;
