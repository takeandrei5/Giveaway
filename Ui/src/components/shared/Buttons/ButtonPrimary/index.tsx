import { Button, CSSObject, useStyleConfig } from '@chakra-ui/react';

import { ButtonPrimaryProps } from './types';

const ButtonPrimary = (props: ButtonPrimaryProps): JSX.Element => {
	const {
		children,
		disabled = false,
		height = '100%',
		leftIcon,
		rightIcon,
		onClick = () => {},
		type = 'button',
		...rest
	} = props;
	const styles: CSSObject = useStyleConfig('ButtonPrimary');

	return (
		<Button
			__css={styles}
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
