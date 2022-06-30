import { Button, CSSObject, useColorModeValue, useStyleConfig } from '@chakra-ui/react';
import React from 'react';

import { ButtonPrimaryProps } from './types';

const ButtonPrimary = ({
	children,
	disabled = false,
	height = '100%',
	leftIcon,
	rightIcon,
	onClick,
	type = 'button',
	...rest
}: ButtonPrimaryProps): JSX.Element => {
	const lightOrDarkColor: 'light' | 'dark' = useColorModeValue('light', 'dark');

	return (
		<Button
			__css={{
				'& path': {
					stroke: lightOrDarkColor,
				},
			}}
			_active={{
				filter: 'brightness(80%)',
			}}
			_disabled={{
				backgroundColor: `primary.${lightOrDarkColor}`,
				cursor: 'default',
				filter: 'brightness(100%)',
			}}
			_focus={{ boxShadow: 'none' }}
			_hover={{
				filter: 'brightness(90%)',
			}}
			display='flex'
			flexDirection='row'
			alignItems='center'
			borderRadius='2xl'
			backgroundColor={`primary.${lightOrDarkColor}`}
			border={0}
			padding='0.75rem 1.5rem'
			data-testid='button-primary'
			disabled={disabled}
			height={height}
			leftIcon={leftIcon}
			rightIcon={rightIcon}
			onClick={onClick}
			type={type}
			{...rest}>
			{children}
		</Button>
	);
};

export default ButtonPrimary;
