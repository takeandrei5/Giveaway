import { deleteListing, fetchListing } from '@api/listings';
import { FetchListingDetailsResponse, ListingInformation, OwnerInformation } from '@api/listings/types';
import { NotFoundError } from '@utils/errors';
import { NextRouter, useRouter } from 'next/router';
import { useMutation, useQuery } from 'react-query';

const useFetchListingDetails = (id: string, isAccessTokenLoaded: boolean) => {
	const router: NextRouter = useRouter();

	const { isLoading, data } = useQuery(['fetchListing', id], () => fetchListing(id), {
		onSuccess: (data: FetchListingDetailsResponse | undefined) => {
			if (!data) {
				router.replace('/404');
			}
		},
		onError: (err) => {
			console.error(err);
			router.replace('/404');
		},
		enabled: !!isAccessTokenLoaded,
	});

	const { mutate: deleteListingMutate } = useMutation((accessToken: string) => deleteListing(id, accessToken), {
		onSuccess: () => router.replace('/listings'),
		onError: (err) => {
			console.error(err);

			if (err instanceof NotFoundError) {
				router.replace('/404');

				return;
			}

			router.replace('/500');
		},
	});

	return { isLoading, ...data!, deleteListingMutate };
};

export { useFetchListingDetails };
