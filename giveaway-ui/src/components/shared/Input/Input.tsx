import {
	Input as CuiInput,
	InputGroup,
	InputLeftElement,
	InputRightElement,
	useStyleConfig,
} from '@chakra-ui/react';
import { Typography } from '../Typography';

import { InputI } from './interfaces';

const Input = ({
	placeholder,
	disabled = false,
	label = undefined,
	leftIcon = undefined,
	rightIcon = undefined,
	width = '100%',
}: InputI) => {
	const styles = useStyleConfig('Input');

	return (
		<>
			{label && <Typography variant='paragraph'>Label</Typography>}
			<InputGroup>
				{leftIcon && (
					<InputLeftElement
						pointerEvents='none'
						color='gray.300'
						fontSize='1.2em'
						children={leftIcon}
					/>
				)}
				<CuiInput __css={styles} disabled={disabled} placeholder={placeholder} width={width} />
				{rightIcon && <InputRightElement children={rightIcon} />}
			</InputGroup>
		</>
	);
};

export default Input;
