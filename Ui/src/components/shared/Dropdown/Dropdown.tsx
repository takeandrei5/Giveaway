import { Select } from '@chakra-ui/react';
import { useMemo } from 'react';

import { DropdownOption, DropdownProps } from './types';

const Dropdown = ({ options, onChangeHandler, name, value }: DropdownProps) => {
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

	return (
		<Select
			bgColor='white'
			borderRadius='2xl'
			name={name}
			onChange={(e) => onChangeHandler(e.target.value)}
			value={value}>
			{renderOptions}
		</Select>
	);
};

export default Dropdown;
