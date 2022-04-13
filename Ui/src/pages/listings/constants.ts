import { DropdownOptionI } from '../../components/shared/Dropdown/interfaces';
import { CategoryDictionary } from './interfaces';

const categoryDictionary: CategoryDictionary = {
	clothes: 1,
	toys: 2,
	books: 3,
	electronics: 4,
};

const dropdownOptions: DropdownOptionI[] = [
	{
		value: 'Title',
		displayValue: 'Title ascending',
	},
	{
		value: 'Title DESC',
		displayValue: 'Title descending',
	},
	{
		value: 'CreatedAt',
		displayValue: 'Date created on ascending',
	},
	{
		value: 'CreatedAt DESC',
		displayValue: 'Date created on descending',
	},
];

export { categoryDictionary, dropdownOptions };
