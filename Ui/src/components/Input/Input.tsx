import {
	CSSObject,
	FormLabel,
	Input as CuiInput,
	InputGroup,
	InputLeftElement,
	InputRightElement,
	Textarea,
	useColorModeValue,
	useStyleConfig,
} from '@chakra-ui/react';
import { Typography } from '@components';

import { InputProps } from './types';

const Input = ({
	id,
	placeholder,
	name,
	value,
	onChange,
	onBlur,
	disabled = false,
	multiline = false,
	isInvalid = false,
	height = 'auto',
	label = '',
	leftIcon,
	rightIcon,
	width = '100%',
}: InputProps): JSX.Element => {
	const styles: CSSObject = useStyleConfig('Input');

	const lightOrDarkColor: 'light' | 'dark' = useColorModeValue('light', 'dark');
	const darkOrLightColor: 'dark' | 'light' = useColorModeValue('dark', 'light');

	return (
		<>
			{!!label && (
				<FormLabel data-testid='label' htmlFor={id}>
					<Typography variant='paragraph'>{label}</Typography>
				</FormLabel>
			)}
			{!multiline ? (
				<InputGroup height='100%' width='auto'>
					{leftIcon && (
						<InputLeftElement
							data-testId='left-icon'
							color='gray'
							fontSize='1.5rem'
							height='100%'
							paddingStart='4'
							pointerEvents='none'>
							{leftIcon}
						</InputLeftElement>
					)}
					<CuiInput
						data-testid='input'
						__css={styles}
						borderColor={`primary.${lightOrDarkColor}`}
						boxShadow={`inset 0 0 0 0.0125rem var(--chakra-colors-primary-${lightOrDarkColor})`}
						color={darkOrLightColor}
						id={id}
						height={height}
						isInvalid={isInvalid}
						disabled={disabled}
						name={name}
						placeholder={placeholder}
						onChange={onChange}
						onBlur={onBlur}
						value={value}
						width={width}
					/>
					{rightIcon && (
						<InputRightElement data-testId='right-icon' pointerEvents={'auto'} height='100%'>
							{rightIcon}
						</InputRightElement>
					)}
				</InputGroup>
			) : (
				<Textarea
					data-testid='textarea'
					__css={styles}
					borderColor={`primary.${lightOrDarkColor}`}
					boxShadow={`inset 0 0 0 0.0125rem var(--chakra-colors-primary-${lightOrDarkColor})`}
					color={darkOrLightColor}
					id={id}
					disabled={disabled}
					name={name}
					isInvalid={isInvalid}
					placeholder={placeholder}
					onChange={onChange}
					onBlur={onBlur}
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
