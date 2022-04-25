import { Flex, useColorModeValue } from '@chakra-ui/react';
import { MdRefresh } from 'react-icons/md';
import { RiSendPlaneFill } from 'react-icons/ri';

import { ButtonPrimary, Typography } from '../../../../components';
import { ButtonContainerProps } from './types';

const ButtonContainer = ({ resetButtonText, submitButtonText }: ButtonContainerProps): JSX.Element => {
	const lightishOrDarkishColor: 'lightish' | 'darkish' = useColorModeValue('lightish', 'darkish');

	return (
		<Flex justifyContent='end' gap={2}>
			<ButtonPrimary
				color={lightishOrDarkishColor}
				backgroundColor='#F31A2A'
				leftIcon={<MdRefresh fontSize='medium' />}
				type='reset'>
				<Typography variant='button'>{resetButtonText}</Typography>
			</ButtonPrimary>

			<ButtonPrimary color={lightishOrDarkishColor} leftIcon={<RiSendPlaneFill fontSize='larger' />} type='submit'>
				<Typography variant='button'>{submitButtonText}</Typography>
			</ButtonPrimary>
		</Flex>
	);
};

export default ButtonContainer;
