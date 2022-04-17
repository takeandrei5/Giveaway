export type InputProps = {
	id: string;
	name: string;
	placeholder: string;
	disabled?: boolean;
	height?: string;
	label?: string;
	leftIcon?: JSX.Element;
	rightIcon?: JSX.Element;
	onChange?: () => void;
	value?: string;
	width?: string;
};
