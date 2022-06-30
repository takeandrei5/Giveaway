import { Select, useColorModeValue } from '@chakra-ui/react';
import { useMemo, useCallback } from 'react';

import { DropdownOption, DropdownProps } from './types';

const Dropdown = ({ id, options, onChangeHandler, name, value, isInvalid = false }: DropdownProps) => {
	const lightOrDarkColor: 'light' | 'dark' = useColorModeValue('light', 'dark');

	const renderOptions = useMemo(
		(): JSX.Element[] =>
			options.map(
				(opt: DropdownOption): JSX.Element => (
					<option key={opt.value} value={opt.value}>
						{opt.displayValue}
					</option>
				)
			),
		[options]
	);

	const onChangeHandlerCallback = useCallback(
		(event: React.ChangeEvent<HTMLSelectElement>) => onChangeHandler(event.target.value),
		[onChangeHandler]
	);

	return (
		<Select
			data-testid='dropdown'
			boxShadow='base'
			_focus={{
				border: 0,
			}}
			bgColor={`primary.${lightOrDarkColor}`}
			color={lightOrDarkColor}
			border={0}
			borderRadius='2xl'
			cursor='pointer'
			id={id}
			isInvalid={isInvalid}
			name={name}
			onChange={onChangeHandlerCallback}
			value={value}
			width='fit-content'>
			{renderOptions}
		</Select>
	);
};

export default Dropdown;
