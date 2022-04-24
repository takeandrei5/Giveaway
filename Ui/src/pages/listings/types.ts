import { DropdownOption } from '../../components/shared/Dropdown/types';
import { ItemData } from '../../modules/listings/ItemsList/types';
import { CategoryType, DehydratedState, PaginatedResult } from '../../utils/types';

export interface FetchListingsResponse {
	listings: PaginatedResult<ItemData>;
}
export type ListingsPageProps = DehydratedState & { options: DropdownOption[] };
export type FilterByCategory = 'Title' | 'Title DESC' | 'CreatedAt' | 'CreatedAt DESC';

export type CategoryDictionary = { [name in CategoryType]: number };
