import { Flex, Grid, GridItem, Skeleton, useColorModeValue } from '@chakra-ui/react';
import { ButtonPrimary, Typography } from '@components';
import { useGetAccessToken } from '@utils/hooks';
import { NextRouter, useRouter } from 'next/router';
import { GrTrash, GrUpdate } from 'react-icons/gr';
import { MdArrowBackIosNew } from 'react-icons/md';

import { ActionButton } from './ActionButton';
import { useFetchListingDetails } from './hooks';
import { ImageSlider } from './ImageSlider';
import { ListingInformation } from './ListingInformation';
import { OwnerInformation } from './OwnerInformation';
import { ListingDetailsProps } from './types';

const ListingDetails = ({ id }: ListingDetailsProps) => {
	const router: NextRouter = useRouter();
	const { isFetched, data } = useGetAccessToken();
	const { isLoading, listingInfo, ownerInfo, deleteListingMutate } = useFetchListingDetails(id, isFetched);

	const lightOrDarkColor: 'light' | 'dark' = useColorModeValue('light', 'dark');

	return (
		<Skeleton borderRadius='2xl' isLoaded={!isLoading}>
			<Flex flexDirection='column' gap={2}>
				<Typography variant='h1' color={`primary.${lightOrDarkColor}`}>
					Details
				</Typography>
				<Flex>
					<ButtonPrimary
						backgroundColor={`primary.${lightOrDarkColor}`}
						leftIcon={<MdArrowBackIosNew color='white' size='1rem' />}
						onClick={() => router.push('/listings')}>
						<Typography variant='button' color={lightOrDarkColor}>
							Back
						</Typography>
					</ButtonPrimary>
					<Flex gap={2} marginLeft='auto'>
						<ActionButton
							bgColor={`primary.${lightOrDarkColor}`}
							icon={<GrUpdate fontSize='medium' />}
							label='Update listing'
							ownerEmail={ownerInfo.email}
							onClick={() => router.push(`/update-listing/${id}`)}
						/>
						<ActionButton
							bgColor={`primary.${lightOrDarkColor}`}
							icon={<GrTrash fontSize='medium' />}
							label='Delete listing'
							ownerEmail={ownerInfo.email}
							onClick={() => deleteListingMutate(data!)}
						/>
					</Flex>
				</Flex>
			</Flex>
			<ImageSlider images={listingInfo.images} />
			<Grid templateColumns='repeat(12, 1fr)' gap={5} marginTop='1rem'>
				<GridItem colSpan={8}>
					<ListingInformation {...listingInfo} />
				</GridItem>
				<GridItem colSpan={4}>
					<OwnerInformation {...ownerInfo} />
				</GridItem>
			</Grid>
		</Skeleton>
	);
};

export default ListingDetails;
