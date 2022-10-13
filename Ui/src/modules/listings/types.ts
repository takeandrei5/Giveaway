import { ItemData } from '@api/webapi/listings/types';
import { DropdownOption } from '@components/Dropdown/types';
import { PaginatedResult, SortingType } from '@utils/types';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from 'react-query';

export type ListingsProps = { options: DropdownOption[] };

export type FetchListingsResponse = {
	listings: PaginatedResult<ItemData>;
};

export type UseInfiniteFetchListingsResult = {
	handleSortingDropdownChange: (value: string) => void;
	isLoading: boolean;
	nextData: PaginatedResult<ItemData> | undefined;
	refetchListings: <TPageData>(
		options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
	) => Promise<QueryObserverResult<PaginatedResult<ItemData>, unknown>>;
	sort: SortingType;
	totalData: ItemData[];
};
