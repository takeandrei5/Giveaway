import { Flex } from '@chakra-ui/react';

import { Dropdown, Typography } from '../../components/shared';
import { SortingDropdownProps } from './types';

const SortingDropdown = ({ options, onChangeHandler, value }: SortingDropdownProps): JSX.Element => (
	<Flex marginTop='1rem'>
		<Flex alignItems='center' direction='row' marginLeft='auto' columnGap='0.625rem'>
			<Typography variant='input'>Sort by: </Typography>
			<Dropdown options={options} onChangeHandler={onChangeHandler} value={value} />
		</Flex>
	</Flex>
);

export default SortingDropdown;
