import { ListingItemI } from '../../components/standalone/ListingItem/interfaces';
import { Category } from '../../utils/types';

export interface ItemsI {
	items: Omit<ListingItemI, 'onClick'>[];
}

export interface CategoryBoxI {
	categories: CategoryItemI[];
}

export interface CategoryItemI {
	category: Category;
	image: string;
	name: string;
}
