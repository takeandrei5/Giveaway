import { DropdownProps } from '../../components/shared/Dropdown/types';
import { CategoryBoxProps, ItemData } from '../../modules/listings/types';
import { CategoryType, PaginatedResult } from '../../utils/types';

export interface FetchListingsResponse {
	listings: PaginatedResult<ItemData>;
}
export type ListingsPageProps = CategoryBoxProps & FetchListingsResponse & Omit<DropdownProps, 'onChangeHandler'>;
export type FilterByCategory = 'Title' | 'Title DESC' | 'CreatedAt' | 'CreatedAt DESC';

export type CategoryDictionary = { [name in CategoryType]: number };
