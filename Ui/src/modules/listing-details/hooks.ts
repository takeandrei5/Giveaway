import { NextRouter, useRouter } from 'next/router';
import { useMutation, useQuery } from 'react-query';

import deleteListing from '../../api/listings/deleteListing';
import fetchListing from '../../api/listings/fetchListing';
import { ListingInformation, OwnerInformation } from '../../api/listings/types';
import { NotFoundError } from '../../utils/errors';

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

	const { listingInfo, ownerInfo }: { listingInfo: ListingInformation } & { ownerInfo: OwnerInformation } = data!;

	return { listingInfo, ownerInfo, deleteListingMutate };
};

export default useFetchListingDetails;
