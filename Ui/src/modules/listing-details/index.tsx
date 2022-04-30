import { Flex, Grid, GridItem, Skeleton } from '@chakra-ui/react';
import { NextRouter, useRouter } from 'next/router';
import { GrTrash, GrUpdate } from 'react-icons/gr';
import { useGetAccessToken } from 'utils/hooks';

import { ActionButton } from './ActionButton';
import useFetchListingDetails from './hooks';
import { ImageSlider } from './ImageSlider';
import { ListingInformation } from './ListingInformation';
import { OwnerInformation } from './OwnerInformation';
import { ListingDetailsModuleProps } from './types';

const ListingDetailsModule = ({ id }: ListingDetailsModuleProps) => {
	const router: NextRouter = useRouter();
	const { isFetched, data } = useGetAccessToken(false);
	const { isLoading, listingInfo, ownerInfo, deleteListingMutate } = useFetchListingDetails(id);

	return (
		<Skeleton borderRadius='2xl' isLoaded={!isLoading}>
			<Flex width='100%' gap={2} justifyContent='end'>
				<ActionButton
					bgColor='primary.main'
					icon={<GrUpdate fontSize='mediun' />}
					label='Update listing'
					ownerEmail={ownerInfo.email}
					onClick={() => router.push(`/update-listing/${id}`)}
				/>
				<ActionButton
					bgColor='#F31A2A'
					icon={<GrTrash fontSize='mediun' />}
					label='Delete listing'
					ownerEmail={ownerInfo.email}
					onClick={() => deleteListingMutate(data!)}
				/>
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

export default ListingDetailsModule;
