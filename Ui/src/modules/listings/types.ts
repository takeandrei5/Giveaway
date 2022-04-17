import { DropdownOption } from '../../components/shared/Dropdown/types';
import { ListingItemProps } from '../../components/standalone/ListingItem/types';
import { CategoryType } from '../../utils/types';

export type ItemsProps = {
	items: ItemData[];
};

export type ItemData = Omit<ListingItemProps, 'onClick'>;

export type CategoryBoxProps = {
	categories: Category[];
};

export type Category = {
	category: CategoryType;
	image: string;
	name: string;
};

export type SortingDropdownProps = {
	options: DropdownOption[];
	onChangeHandler: (value: string) => void;
};
