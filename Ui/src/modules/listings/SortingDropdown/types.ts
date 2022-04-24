import { DropdownOption, DropdownProps } from '../../../components/shared/Dropdown/types';

export type SortingDropdownProps = DropdownProps & { id: string; name: string };

export type ListingsModuleProps = { options: DropdownOption[] };
