import { deleteListing, fetchListing } from '@api/listings';
import { ListingInformation, OwnerInformation } from '@api/listings/types';
import { NotFoundError } from '@utils/errors';
import { NextRouter, useRouter } from 'next/router';
import { useMutation, useQuery } from 'react-query';

const useFetchListingDetails = (id: string) => {
	const router: NextRouter = useRouter();

	const { isLoading, data } = useQuery(['fetchListing', id], () => fetchListing(id));

	const { mutate: deleteListingMutate } = useMutation((accessToken: string) => deleteListing(id, accessToken), {
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

	return { isLoading, listingInfo, ownerInfo, deleteListingMutate };
};

export default useFetchListingDetails;
