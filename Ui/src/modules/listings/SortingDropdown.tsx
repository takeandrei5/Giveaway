import { Flex } from '@chakra-ui/react';

import { Dropdown, Typography } from '../../components/shared';
import { SortingDropdownProps } from './types';

const SortingDropdown = ({ options, onChangeHandler }: SortingDropdownProps): JSX.Element => (
	<Flex marginTop='1rem'>
		<Flex alignItems='center' direction='row' marginLeft='auto' columnGap='0.625rem'>
			<Typography variant='input'>Sort by: </Typography>
			<Dropdown options={options} onChangeHandler={onChangeHandler} />
		</Flex>
	</Flex>
);

export default SortingDropdown;
