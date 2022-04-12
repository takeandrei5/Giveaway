import { Button, CSSObject, useStyleConfig } from '@chakra-ui/react';

import { Typography } from '../../Typography';
import { ButtonPrimaryI } from './interface';

const ButtonPrimary = (props: ButtonPrimaryI): JSX.Element => {
	const {
		children,
		disabled = false,
		height = '100%',
		leftIcon, 
		rightIcon,
		onClick = () => {},
		type = 'button',
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
			type={type}>
			<Typography variant='button' color='darkish'>{children}</Typography>
		</Button>
	);
};

export default ButtonPrimary;
