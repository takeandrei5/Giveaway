import { deleteListing, fetchListing } from '@api/webapi/listings/client-side';
import { FetchListingDetailsResponse } from '@api/webapi/listings/types';
import { NotFoundError } from '@utils/errors';
import { NextRouter, useRouter } from 'next/router';
import { QueryFunctionContext, useMutation, useQuery } from 'react-query';

import { UseFetchListingDetailsResult } from './types';

const useFetchListingDetails = (id: string): UseFetchListingDetailsResult => {
	const router: NextRouter = useRouter();

	const { isLoading, data } = useQuery(
		['fetchListing', id],
		async ({ signal }: QueryFunctionContext<string[], unknown>) => await fetchListing(id, signal),
		{
			onSuccess: (data: FetchListingDetailsResponse | undefined) => {
				if (!data) {
					router.replace('/404');
				}
			},
			onError: (err) => {
				console.error(err);
				router.replace('/404');
			},
		}
	);

	const { mutate: deleteListingMutate } = useMutation(() => deleteListing(id), {
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

	const handleBackButtonClick = () => router.push('/listings');

	const handleUpdateListingButtonClick = () => router.push(`/update-listing/${id}`);

	const handleDeleteListingButtonClick = (): void => deleteListingMutate();

	return { isLoading, ...data!, handleBackButtonClick, handleDeleteListingButtonClick, handleUpdateListingButtonClick };
};

export { useFetchListingDetails };
