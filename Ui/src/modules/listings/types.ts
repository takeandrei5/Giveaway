import { ItemData } from '@api/listings/types';
import { DropdownOption } from '@components/Dropdown/types';
import { PaginatedResult } from '@utils/types';

export type ListingsProps = { options: DropdownOption[] };

export interface FetchListingsResponse {
	listings: PaginatedResult<ItemData>;
}
