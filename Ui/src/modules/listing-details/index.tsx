import { Grid, GridItem } from '@chakra-ui/react';
import { NextRouter, useRouter } from 'next/router';
import { useMutation, useQuery } from 'react-query';

import { fetchListing } from '../../pages/listings/[id]/apis';
import {
	ListingInformation as ListingInformationProps,
	OwnerInformation as OwnerInformationProps,
} from '../../pages/listings/[id]/types';
import { NotFoundError } from '../../utils/errors';
import { deleteListing } from './apis';
import { DeleteListingButton } from './DeleteListingButton';
import { ImageSlider } from './ImageSlider';
import { ListingInformation } from './ListingInformation';
import { OwnerInformation } from './OwnerInformation';
import { ListingDetailsModuleProps } from './types';

const ListingDetailsModule = ({ id, accessToken }: ListingDetailsModuleProps) => {
	const router: NextRouter = useRouter();

	const { data } = useQuery(['fetchListing', id], () => fetchListing(id));

	const { mutate: deleteListingMutate } = useMutation(() => deleteListing(id, accessToken!), {
		onSuccess: () => router.replace('/listings'),
		onError: (err) => {
			if (err instanceof NotFoundError) {
				console.error('Delete listing failed ', err);
				return;
			}

			router.replace('/500');
		},
	});

	const { listingInfo, ownerInfo }: { listingInfo: ListingInformationProps } & { ownerInfo: OwnerInformationProps } =
		data!;

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
