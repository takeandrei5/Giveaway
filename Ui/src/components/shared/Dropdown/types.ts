export type DropdownProps = {
	options: DropdownOption[];
	onChangeHandler: (value: string) => void;
};

export type DropdownOption = {
	value: string | number;
	displayValue: string;
};
