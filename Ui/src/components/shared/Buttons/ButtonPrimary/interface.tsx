export interface ButtonPrimaryI {
	children: string;
	disabled?: boolean;
	height?: string
	leftIcon?: JSX.Element;
	rightIcon?: JSX.Element;
	onClick?: () => void;
	type?: 'submit' | 'reset' | 'button';
}
