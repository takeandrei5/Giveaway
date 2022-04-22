export type InputProps = {
	id: string;
	name: string;
	placeholder: string;
	value: string;
	disabled?: boolean;
	multiline?: boolean;
	height?: string;
	label?: string;
	leftIcon?: JSX.Element;
	rightIcon?: JSX.Element;
	onChange?: () => void;
	width?: string;
};
