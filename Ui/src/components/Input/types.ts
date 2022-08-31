export type InputProps = {
	id: string;
	name: string;
	placeholder: string;
	value?: string;
	onBlur?: (e: React.ChangeEvent<HTMLCustomInputElement>) => void;
	onChange?: (e: React.ChangeEvent<HTMLCustomInputElement>) => void;
	onKeyDown?: (e: React.KeyboardEvent<HTMLCustomInputElement>) => void;
	onKeyPress?: (e: React.KeyboardEvent<HTMLCustomInputElement>) => void;
	onKeyUp?: (e: React.KeyboardEvent<HTMLCustomInputElement>) => void;
	disabled?: boolean;
	multiline?: boolean;
	isInvalid?: boolean;
	height?: string | number;
	label?: string;
	leftIcon?: JSX.Element;
	rightIcon?: JSX.Element;
	rows?: number;
	width?: string | number;
};

export type HTMLCustomInputElement = HTMLInputElement | HTMLTextAreaElement;
