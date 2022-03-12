import {
	FormLabel,
	Input as CuiInput,
	InputGroup,
	InputLeftElement,
	InputRightElement,
	useStyleConfig,
} from '@chakra-ui/react';
import { FormikValues, useField } from 'formik';

import { Typography } from '../Typography';
import { InputI } from './interfaces';

const Input = ({
	id,
	placeholder,
	name,
	disabled = false,
	height = '100%',
	label,
	leftIcon,
	rightIcon,
	onChange = () => {},
	value,
	width = '100%',
}: InputI): JSX.Element => {
	const styles = useStyleConfig('Input');

	const [field, meta] = useField(name);

	return (
		<>
			{label && (
				<FormLabel htmlFor={id}>
					<Typography variant='paragraph'>Label</Typography>
				</FormLabel>
			)}
			<InputGroup height='100%' width='auto'>
				{leftIcon && (
					<InputLeftElement
						color='gray.300'
						fontSize='1.5rem'
						height='100%'
						paddingStart='4'
						pointerEvents='none'
						children={leftIcon}
					/>
				)}
				<CuiInput
					__css={styles}
					id={id}
					disabled={disabled}
					height={height}
					name={name}
					paddingStart='14'
					placeholder={placeholder}
					onChange={field ? field.onChange : onChange}
					value={value}
					width={width}
				/>
				{rightIcon && <InputRightElement children={rightIcon} height='100%' />}
			</InputGroup>
		</>
	);
};

export default Input;
