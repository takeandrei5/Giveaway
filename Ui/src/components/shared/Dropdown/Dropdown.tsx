import { Select } from '@chakra-ui/react';
import { useMemo } from 'react';

import { DropdownOption, DropdownProps } from './types';

const Dropdown = ({ options, onChangeHandler }: DropdownProps) => {
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
		<Select bgColor='white' borderRadius='2xl' onChange={(e) => onChangeHandler(e.target.value)}>
			{renderOptions}
		</Select>
	);
};

export default Dropdown;
