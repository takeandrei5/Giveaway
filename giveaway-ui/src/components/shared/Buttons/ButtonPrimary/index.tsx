import { useStyleConfig } from '@chakra-ui/react';
import { ButtonPrimaryI } from './interface';

import { Button } from '@chakra-ui/react';
import { Typography } from '../../Typography';

const ButtonPrimary = (props: ButtonPrimaryI) => {
	const { children, onClick, disabled = false } = props;
	const styles = useStyleConfig('ButtonPrimary');

	return (
		<Button __css={styles} disabled={disabled} onClick={onClick}>
			<Typography variant='button'>{children}</Typography>
		</Button>
	);
};

export default ButtonPrimary;
