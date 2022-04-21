import { useUser } from '@auth0/nextjs-auth0';
import { Flex, useColorModeValue } from '@chakra-ui/react';

import { ButtonPrimary, Typography } from '../../components';
import Skeleton from '../../components/shared/Skeleton/Skeleton';
import { DeleteListingProps } from './types';
import { FaTrashAlt } from 'react-icons/fa';

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
