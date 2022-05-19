import { DropdownOption } from '@components/shared/Dropdown/types';
import { CategoryType, DehydratedState } from '@utils/types';

export type ListingsPageProps = DehydratedState & { options: DropdownOption[] };
export type FilterByCategory = 'Title' | 'Title DESC' | 'CreatedAt' | 'CreatedAt DESC';

export type CategoryDictionary = { [name in CategoryType]: number };
