export interface DropdownI {
	options: DropdownOptionI[]
	onChangeHandler: (value: string) => void
}

export interface DropdownOptionI {
	value: string | number
	displayValue: string
}