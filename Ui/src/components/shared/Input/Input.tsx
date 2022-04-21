import {
	CSSObject,
	FormLabel,
	Input as CuiInput,
	InputGroup,
	InputLeftElement,
	InputRightElement,
	useStyleConfig,
} from '@chakra-ui/react';
import { useField } from 'formik';

import { Typography } from '../Typography';
import { InputProps } from './types';

const Input = ({
	id,
	placeholder,
	name,
	disabled = false,
	height = '10',
	label,
	leftIcon,
	rightIcon,
	onChange = () => {},
	value,
	width = '100%',
}: InputProps): JSX.Element => {
	const styles: CSSObject = useStyleConfig('Input');

	const [field] = useField(name);

	return (
		<>
			{label && (
				<FormLabel htmlFor={id}>
					<Typography variant='paragraph'>Label</Typography>
				</FormLabel>
			)}
			<InputGroup height='100%' width='auto'>
				{leftIcon && (
					<InputLeftElement color='gray' fontSize='1.5rem' height='100%' paddingStart='4' pointerEvents='none'>
						{leftIcon}
					</InputLeftElement>
				)}
				<CuiInput
					__css={styles}
					id={id}
					height={height}
					disabled={disabled}
					name={name}
					placeholder={placeholder}
					onChange={field ? field.onChange : onChange}
					value={value}
					width={width}
				/>
				{rightIcon && (
					<InputRightElement pointerEvents={'auto'} height='100%'>
						{rightIcon}
					</InputRightElement>
				)}
			</InputGroup>
		</>
	);
};

export default Input;
