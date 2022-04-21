import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import { getAccessToken } from '@auth0/nextjs-auth0';
import { Grid, GridItem } from '@chakra-ui/react';
import { NextRouter, useRouter } from 'next/router';
import { GetServerSidePropsContext, NextPage, Redirect } from 'next/types';
import { dehydrate, useMutation, useQuery } from 'react-query';

import {
	ListingDetailsImageSlider,
	ListingDetailsInformationBox,
	ListingDetailsOwnerInformation,
} from '../../../modules';
import DeleteListing from '../../../modules/listing-details/DeleteListing';
import { NotFoundError } from '../../../utils/errors';
import { queryClient } from '../../../utils/queryClient';
import { deleteListing, fetchListing } from './apis';
import { ListingDetailsPageProps, ListingInformation, OwnerInformation } from './types';

const ListingDetailsPage: NextPage<ListingDetailsPageProps> = ({ accessTokenResult, id }: ListingDetailsPageProps) => {
	const router: NextRouter = useRouter();

	const { data } = useQuery(['fetchListing', id], () => fetchListing(id));

	const { mutate: deleteListingMutate } = useMutation(() => deleteListing(id, accessTokenResult.accessToken!), {
		onSuccess: () => router.replace('/listings'),
		onError: (err) => {
			console.error('Delete listing failed ', err);
		},
	});

	const { listingInfo, ownerInfo }: { listingInfo: ListingInformation; ownerInfo: OwnerInformation } = data!;

	return (
		<>
			<DeleteListing ownerEmail={ownerInfo.email} onClick={deleteListingMutate} />
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
	context: GetServerSidePropsContext
): Promise<{ props: ListingDetailsPageProps } | { redirect: Redirect }> {
	const id: string = context.params?.id as string;
	try {
		await queryClient.fetchQuery(['fetchListing', id], () => fetchListing(id));
	} catch (err) {
		if (err instanceof NotFoundError) {
			return {
				redirect: {
					permanent: true,
					destination: '/404',
				},
			};
		}

		return {
			redirect: {
				permanent: true,
				destination: '500',
			},
		};
	}

	const accessTokenResult = await getAccessToken(context.req, context.res);

	return {
		props: {
			id,
			dehydratedState: dehydrate(queryClient),
			accessTokenResult,
		},
	};
}

export default ListingDetailsPage;
