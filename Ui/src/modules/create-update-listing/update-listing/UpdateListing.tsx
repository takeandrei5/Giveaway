import { Flex } from '@chakra-ui/react';
import { useGetAccessToken } from '@utils/hooks';

import { FormContainer } from '../shared';
import { useUpdateListing } from './hooks';
import { UpdateListingProps } from './types';

const UpdateListing = ({ accessToken, id, initialValues }: UpdateListingProps) => {
	useGetAccessToken('', true);
	const { formik } = useUpdateListing(id, accessToken, initialValues);

	return (
		<Flex flex={1}>
			<FormContainer formik={formik} pageTitle='Update listing!' resetButtonText='Reset' submitButtonText='Update' />
		</Flex>
	);
};

export default UpdateListing;
