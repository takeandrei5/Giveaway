export type DropdownProps = {
	options: DropdownOption[];
	onChangeHandler: (value: string) => void;
	value: string | number | readonly string[];
	name?: string;
};

export type DropdownOption = {
	value: string | number;
	displayValue: string;
};
