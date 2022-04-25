import { Flex, Grid, GridItem } from '@chakra-ui/react';
import { NextRouter, useRouter } from 'next/router';
import { GrTrash, GrUpdate } from 'react-icons/gr';

import { ActionButton } from './ActionButton';
import useFetchListingDetails from './hooks';
import { ImageSlider } from './ImageSlider';
import { ListingInformation } from './ListingInformation';
import { OwnerInformation } from './OwnerInformation';
import { ListingDetailsModuleProps } from './types';

const ListingDetailsModule = ({ id, accessToken }: ListingDetailsModuleProps) => {
	const router: NextRouter = useRouter();
	const { listingInfo, ownerInfo, deleteListingMutate } = useFetchListingDetails(id, accessToken);

	return (
		<>
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
					onClick={deleteListingMutate}
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
		</>
	);
};

export default ListingDetailsModule;
