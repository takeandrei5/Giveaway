import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import { Grid, GridItem } from '@chakra-ui/react';
import { NextPageContext } from 'next';
import { NextPage, Redirect } from 'next/types';

import {
	ListingDetailsImageSlider,
	ListingDetailsInformationBox,
	ListingDetailsOwnerInformation,
} from '../../../modules';
import { fetchListing } from './apis';
import { ListingDetailsPageProps } from './types';

const ListingDetailsPage: NextPage<ListingDetailsPageProps> = ({ listingInfo, ownerInfo }: ListingDetailsPageProps) => {
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

export async function getServerSideProps(
	context: NextPageContext
): Promise<{ props: ListingDetailsPageProps } | { redirect: Redirect }> {
	const id = context.query.id as string;
	const listingDetails = await fetchListing(id as string);

	if (!listingDetails) {
		return {
			redirect: {
				permanent: true,
				destination: '/404',
			},
		};
	}

	return {
		props: {
			...listingDetails,
		},
	};
}

export default ListingDetailsPage;
