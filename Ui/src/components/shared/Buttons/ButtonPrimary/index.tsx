import { Button, CSSObject, useStyleConfig } from '@chakra-ui/react';

import { ButtonPrimaryProps } from './types';

const ButtonPrimary = ({
	children,
	disabled = false,
	height = '100%',
	leftIcon,
	rightIcon,
	onClick = () => {},
	type = 'button',
	...rest
}: ButtonPrimaryProps): JSX.Element => {
	const styles: CSSObject = useStyleConfig('ButtonPrimary');

	return (
		<Button
			__css={styles}
			data-testid='button-primary'
			disabled={disabled}
			height={height}
			leftIcon={leftIcon}
			rightIcon={rightIcon}
			onClick={onClick}
			type={type}
			{...rest}>
			{children}
		</Button>
	);
};

export default ButtonPrimary;
