import { Flex } from '@chakra-ui/react';

import { FormContainer } from '../shared';
import { useUpdateListing } from './hooks';
import { UpdateListingProps } from './types';

const UpdateListing = ({ id, initialValues }: UpdateListingProps) => {
	const { formik } = useUpdateListing(id, initialValues);

	return (
		<Flex flex={1}>
			<FormContainer formik={formik} pageTitle='Update listing!' resetButtonText='Reset' submitButtonText='Update' />
		</Flex>
	);
};

export default UpdateListing;
