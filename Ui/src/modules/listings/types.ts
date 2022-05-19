import { ItemData } from '@api/listings/types';
import { DropdownOption } from '@components/shared/Dropdown/types';
import { PaginatedResult } from '@utils/types';

export type ListingsModuleProps = { options: DropdownOption[] };

export interface FetchListingsResponse {
	listings: PaginatedResult<ItemData>;
}
