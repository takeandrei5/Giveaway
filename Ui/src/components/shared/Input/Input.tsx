import {
	CSSObject,
	FormLabel,
	Input as CuiInput,
	InputGroup,
	InputLeftElement,
	InputRightElement,
	Textarea,
	useStyleConfig,
} from '@chakra-ui/react';
import { useField } from 'formik';

import { Typography } from '../Typography';
import { InputProps } from './types';

const Input = ({
	id,
	placeholder,
	name,
	value,
	disabled = false,
	multiline = false,
	height = 'auto',
	label,
	leftIcon,
	rightIcon,
	onChange = () => {},
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
			{!multiline ? (
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
			) : (
				<Textarea
					__css={styles}
					id={id}
					disabled={disabled}
					name={name}
					placeholder={placeholder}
					onChange={field ? field.onChange : onChange}
					rows={10}
					height={height}
					value={value}
					width={width}
				/>
			)}
		</>
	);
};

export default Input;
