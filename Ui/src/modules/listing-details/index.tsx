import { Grid, GridItem } from '@chakra-ui/react';

import { DeleteListingButton } from './DeleteListingButton';
import useFetchListingDetails from './hooks';
import { ImageSlider } from './ImageSlider';
import { ListingInformation } from './ListingInformation';
import { OwnerInformation } from './OwnerInformation';
import { ListingDetailsModuleProps } from './types';

const ListingDetailsModule = ({ id, accessToken }: ListingDetailsModuleProps) => {
	const { listingInfo, ownerInfo, deleteListingMutate } = useFetchListingDetails(id, accessToken);

	return (
		<>
			<DeleteListingButton ownerEmail={ownerInfo.email} onClick={deleteListingMutate} />
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
