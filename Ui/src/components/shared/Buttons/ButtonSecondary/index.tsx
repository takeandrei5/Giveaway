import { Button, useStyleConfig } from '@chakra-ui/react';
import { ButtonSecondaryI } from './interface';

const ButtonSecondary = (props: ButtonSecondaryI): JSX.Element => {
	const { children, onClick, disabled = false } = props;
	const styles = useStyleConfig('ButtonSecondary');

	return (
		<Button __css={styles} disabled={disabled} onClick={onClick}>
			{children}
		</Button>
	);
};

export default ButtonSecondary;
