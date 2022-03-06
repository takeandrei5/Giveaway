import { useStyleConfig } from '@chakra-ui/react';
import { ButtonPrimaryI } from './interface';

import { Button } from '@chakra-ui/react';

const ButtonPrimary = (props: ButtonPrimaryI) => {
	const { children, onClick, disabled = false } = props;
	const styles = useStyleConfig('ButtonPrimary');

	return <Button __css={styles} disabled={disabled} onClick={onClick}>{children}</Button>;
};

export default ButtonPrimary;
