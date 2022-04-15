import { ButtonProps } from '@chakra-ui/react';

export interface ButtonPrimaryI extends ButtonProps {
	children: string | JSX.Element[] | JSX.Element;
	disabled?: boolean;
	height?: string;
	leftIcon?: JSX.Element;
	rightIcon?: JSX.Element;
	onClick?: () => void;
	type?: 'submit' | 'reset' | 'button';
}
