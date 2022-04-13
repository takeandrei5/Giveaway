import { Select } from '@chakra-ui/react';

import { DropdownI } from './interfaces';
import { useMemo } from 'react';

const Dropdown = ({ options, onChangeHandler }: DropdownI) => {
	const renderOptions = useMemo(
		(): JSX.Element[] =>
			options.map(
				(opt): JSX.Element => (
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
