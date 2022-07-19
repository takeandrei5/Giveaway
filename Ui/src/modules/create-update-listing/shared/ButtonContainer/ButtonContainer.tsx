import { Flex, useColorModeValue } from '@chakra-ui/react';
import { ButtonPrimary, Typography } from '@components';
import { GrRefresh, GrSend } from 'react-icons/gr';

import { ButtonContainerProps } from './types';

const ButtonContainer = ({ resetButtonText, submitButtonText }: ButtonContainerProps): JSX.Element => {
	const lightOrDarkColor: 'light' | 'dark' = useColorModeValue('light', 'dark');

	return (
		<Flex justifyContent='end' gap={2} marginTop='auto'>
			<ButtonPrimary leftIcon={<GrRefresh fontSize='larger' />} type='reset'>
				<Typography variant='button' color={lightOrDarkColor}>
					{resetButtonText}
				</Typography>
			</ButtonPrimary>

			<ButtonPrimary leftIcon={<GrSend fontSize='larger' />} type='submit'>
				<Typography variant='button' color={lightOrDarkColor}>
					{submitButtonText}
				</Typography>
			</ButtonPrimary>
		</Flex>
	);
};

export default ButtonContainer;
