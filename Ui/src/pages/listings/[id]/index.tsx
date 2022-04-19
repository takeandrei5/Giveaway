import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import { Grid, GridItem } from '@chakra-ui/react';
import { NextPageContext } from 'next';
import { useRouter, NextRouter } from 'next/router';
import { NextPage, Redirect } from 'next/types';

import {
	ListingDetailsImageSlider,
	ListingDetailsInformationBox,
	ListingDetailsOwnerInformation,
} from '../../../modules';
import DeleteListing from '../../../modules/listing-details/DeleteListing';
import { deleteListing, fetchListing } from './apis';
import { ListingDetailsPageProps } from './types';
import { getAccessToken } from '@auth0/nextjs-auth0';

const ListingDetailsPage: NextPage<ListingDetailsPageProps> = ({
	accessTokenResult,
	listingInfo,
	ownerInfo,
}: ListingDetailsPageProps) => {
	const router: NextRouter = useRouter();
	console.log(listingInfo);
	const handleDelete = async (): Promise<void> => {
		try {
			await deleteListing(listingInfo.id, accessTokenResult.accessToken!);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<DeleteListing ownerEmail={ownerInfo.email} onClick={handleDelete} />
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
	const accessTokenResult = await getAccessToken(context.req!, context.res!);

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
			accessTokenResult,
		},
	};
}

export default ListingDetailsPage;
