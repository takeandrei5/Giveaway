import { DropdownOption } from '../../components/shared/Dropdown/types';
import { PaginatedResult } from '../../utils/types';
import { ItemData } from './ItemsList/types';

export type ListingsModuleProps = { options: DropdownOption[] };
export interface FetchListingsResponse {
	listings: PaginatedResult<ItemData>;
}
