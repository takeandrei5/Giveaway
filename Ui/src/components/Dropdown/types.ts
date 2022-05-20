export type DropdownProps = {
	id: string;
	options: DropdownOption[];
	onChangeHandler: (value: string) => void;
	name: string;
	value: string | number | readonly string[];
	isInvalid?: false;
};

export type DropdownOption = {
	value: string | number;
	displayValue: string;
};
