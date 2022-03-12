import { useStyleConfig } from '@chakra-ui/react';
import { ButtonPrimaryI } from './interface';

import { Button } from '@chakra-ui/react';
import { Typography } from '../../Typography';

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
	const styles = useStyleConfig('ButtonPrimary');

	return (
		<Button
			__css={styles}
			disabled={disabled}
			height={height}
			leftIcon={leftIcon}
			rightIcon={rightIcon}
			onClick={onClick}
			type={type}>
			<Typography variant='button'>{children}</Typography>
		</Button>
	);
};

export default ButtonPrimary;
