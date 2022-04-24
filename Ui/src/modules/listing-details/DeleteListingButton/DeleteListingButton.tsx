import { useUser } from '@auth0/nextjs-auth0';
import { Flex, useColorModeValue } from '@chakra-ui/react';
import { FaTrashAlt } from 'react-icons/fa';

import { ButtonPrimary, Skeleton, Typography } from '../../../components';
import { DeleteListingProps } from './types';

const DeleteListing = ({ ownerEmail, onClick }: DeleteListingProps) => {
	const { user, error, isLoading } = useUser();

	const lightishOrDarkishColor: 'lightish' | 'darkish' = useColorModeValue('lightish', 'darkish');

	return (
		<Skeleton isLoaded={!isLoading}>
			{user && user.email === ownerEmail && (
				<Flex width='100%'>
					<ButtonPrimary
						color={lightishOrDarkishColor}
						backgroundColor='#F31A2A'
						marginLeft='auto'
						leftIcon={<FaTrashAlt fontSize='medium' />}
						onClick={onClick}>
						<Typography variant='button'>Delete listing</Typography>
					</ButtonPrimary>
				</Flex>
			)}
		</Skeleton>
	);
};

export default DeleteListing;
