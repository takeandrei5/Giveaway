import { DropdownI } from '../../components/shared/Dropdown/interfaces';
import { CategoryBoxI, ItemsDataI } from '../../modules/listings/interfaces';
import { Category, PaginatedResult } from '../../utils/types';

export interface FetchListingsResponse {
	listings: PaginatedResult<ItemsDataI>;
}
export type ListingPageI = CategoryBoxI & FetchListingsResponse & Omit<DropdownI, 'onChangeHandler'>;
export type FilterByCategory = 'Title' | 'Title DESC' | 'CreatedAt' | 'CreatedAt DESC';

export type CategoryDictionary = { [name in Category]: number };
