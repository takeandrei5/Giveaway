export type InputProps = {
	id: string;
	name: string;
	placeholder: string;
	value: string;
	onChange?: (e?: React.ChangeEvent<unknown>) => void;
	onBlur?: (e?: React.ChangeEvent<unknown>) => void;
	disabled?: boolean;
	multiline?: boolean;
	isInvalid?: boolean;
	height?: string;
	label?: string;
	leftIcon?: JSX.Element;
	rightIcon?: JSX.Element;
	width?: string;
};
