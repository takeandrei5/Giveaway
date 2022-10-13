import { fetchListings } from '@api/webapi/listings/client-side';
import { DEFAULT_PAGINATION_OPTIONS } from '@utils/constants';
import { tryFetchQuery } from '@utils/helpers';
import queryClient from '@utils/queryClient';
import { Redirect } from 'next';
import { dehydrate, QueryFunctionContext } from 'react-query';

import { dropdownOptions } from './constants';
import { ListingsPageProps } from './types';

const getListingsServerSideProps = async (): Promise<{ props: ListingsPageProps } | { redirect: Redirect }> => {
	await tryFetchQuery(['fetchListings'], ({ signal }: QueryFunctionContext<string[], unknown>) =>
		fetchListings(DEFAULT_PAGINATION_OPTIONS.pageNumber, DEFAULT_PAGINATION_OPTIONS.pageSize, 'Title ASC', undefined, signal)
	);

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
			options: dropdownOptions,
		},
	};
};

export { getListingsServerSideProps };
