import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import { Divider, Flex, Grid, GridItem } from '@chakra-ui/react';
import { NextPageContext } from 'next';
import { NextPage } from 'next/types';

import { Typography } from '../../../components';
import {
	ListingDetailsImageSlider,
	ListingDetailsInformationBox,
	ListingDetailsOwnerInformation,
} from '../../../modules';
import { fetchListing } from './apis';
import { ListingPageProps } from './types';

const Listing: NextPage<ListingPageProps> = ({ listingInfo, ownerInfo }: ListingPageProps) => {
	return (
		<>
			<ListingDetailsImageSlider images={listingInfo.images} />
			<Grid templateColumns='repeat(12, 1fr)' gap={5} marginTop='1rem'>
				<GridItem colSpan={8}>
					<ListingDetailsInformationBox {...listingInfo} />
				</GridItem>
				<GridItem colSpan={4}>
					<ListingDetailsOwnerInformation {...ownerInfo} />
				</GridItem>
			</Grid>
		</>
	);
};

export async function getServerSideProps(context: NextPageContext) {
	const id = context.query.id as string;
	const listingDetails = await fetchListing(id as string);

	if (!listingDetails) {
		throw new Error('help me');
	}

	return {
		props: {
			...listingDetails,
		},
	};
}

export default Listing;
