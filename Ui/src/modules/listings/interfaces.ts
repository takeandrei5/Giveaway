import { ListingItemI } from '../../components/standalone/ListingItem/interfaces';
import { Category } from '../../utils/types';
import { DropdownOptionI } from '../../components/shared/Dropdown/interfaces';

export interface ItemsI {
	items: ItemsDataI[];
}

export type ItemsDataI = Omit<ListingItemI, 'onClick'>

export interface CategoryBoxI {
	categories: CategoryItemI[];
}

export interface CategoryItemI {
	category: Category;
	image: string;
	name: string;
}

export interface SortingDropdownI {
	options: DropdownOptionI[]
	onChangeHandler: (value: string) => void
}