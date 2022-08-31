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
import { noop } from '@utils/constants';

import { HTMLCustomInputElement, InputProps } from './types';

const Input = ({
	id,
	placeholder,
	name,
	value = undefined,
	onBlur = noop,
	onChange = noop,
	onKeyDown = noop,
	onKeyPress = noop,
	onKeyUp = noop,
	disabled = false,
	multiline = false,
	isInvalid = false,
	height = 'auto',
	label = '',
	leftIcon = undefined,
	rightIcon = undefined,
	rows = 10,
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
				<InputGroup height={height} width='auto'>
					{leftIcon && (
						<InputLeftElement
							data-testId='left-icon'
							color='gray'
							fontSize='1.5rem'
							height={height}
							paddingStart='4'
							pointerEvents='none'>
							{leftIcon}
						</InputLeftElement>
					)}
					<CuiInput
						data-testid='input'
						_focus={{
							borderColor: `primary.${lightOrDarkColor}`,
						}}
						borderColor={`primary.${lightOrDarkColor}`}
						color={darkOrLightColor}
						id={id}
						height={height}
						isInvalid={isInvalid}
						disabled={disabled}
						name={name}
						placeholder={placeholder}
						onBlur={onBlur}
						onChange={onChange}
						onKeyDown={onKeyDown}
						onKeyPress={onKeyPress}
						onKeyUp={onKeyUp}
						spellCheck
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
					_focus={{
						borderColor: `primary.${lightOrDarkColor}`,
					}}
					borderColor={`primary.${lightOrDarkColor}`}
					color={darkOrLightColor}
					id={id}
					disabled={disabled}
					height={height}
					name={name}
					isInvalid={isInvalid}
					placeholder={placeholder}
					onBlur={onBlur}
					onChange={onChange}
					onKeyDown={onKeyDown}
					onKeyPress={onKeyPress}
					onKeyUp={onKeyUp}
					resize='none'
					rows={rows}
					spellCheck
					value={value}
					width={width}
				/>
			)}
		</>
	);
};

export default Input;
