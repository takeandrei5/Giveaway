import { Flex, useColorModeValue } from '@chakra-ui/react';
import { Dropdown, Typography } from '@components';

import { SortingDropdownProps } from './types';

const SortingDropdown = ({ id, name, options, onChangeHandler, value }: SortingDropdownProps): JSX.Element => {
	const darkOrLightColor: 'dark' | 'light' = useColorModeValue('dark', 'light');

	return (
		<Flex marginTop={4}>
			<Flex alignItems='center' direction='row' marginLeft='auto' columnGap={3}>
				<Typography variant='input' color={darkOrLightColor}>
					Sort by:
				</Typography>
				<Dropdown id={id} name={name} options={options} onChangeHandler={onChangeHandler} value={value} />
			</Flex>
		</Flex>
	);
};

export default SortingDropdown;
