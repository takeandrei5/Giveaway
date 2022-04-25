import { NextRouter, useRouter } from 'next/router';
import { useMutation, useQuery } from 'react-query';

import deleteListing from '../../api/listings/deleteListing';
import fetchListing from '../../api/listings/fetchListing';
import { NotFoundError } from '../../utils/errors';
import { ListingInformationProps } from './ListingInformation/types';
import { OwnerInformationProps } from './OwnerInformation/types';

const useFetchListingDetails = (id: string, accessToken: string | undefined) => {
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

	return { listingInfo, ownerInfo, deleteListingMutate };
};

export default useFetchListingDetails;
