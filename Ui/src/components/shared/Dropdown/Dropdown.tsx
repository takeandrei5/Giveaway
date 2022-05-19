import { Select } from '@chakra-ui/react';
import { useMemo, useCallback } from 'react';

import { DropdownOption, DropdownProps } from './types';

const Dropdown = ({ id, options, onChangeHandler, name, value, isInvalid = false }: DropdownProps) => {
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
			bgColor='white'
			_focus={{ borderColor: 'primary.main' }}
			borderRadius='2xl'
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
