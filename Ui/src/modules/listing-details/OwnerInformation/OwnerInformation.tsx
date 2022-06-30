import { Avatar, Divider, Flex, useColorModeValue } from '@chakra-ui/react';
import { Typography } from '@components';

import { OwnerInformationProps } from './types';

const OwnerInformation = ({ email, name, image }: OwnerInformationProps): JSX.Element => {
	const lightOrDarkColor: 'light' | 'dark' = useColorModeValue('light', 'dark');
	const darkOrLightColor: 'dark' | 'light' = useColorModeValue('dark', 'light');

	return (
		<Flex
			alignItems='center'
			height='100%'
			flexDirection='column'
			borderRadius='2xl'
			bgColor='white'
			padding='1.5rem'
			maxWidth='100%'
			rowGap='0.375rem'>
			<Typography center variant='h3' color={`primary.${lightOrDarkColor}`}>
				Contact Information
			</Typography>
			<Avatar __css={{ referrerPolicy: 'no-referrer' }} size={'2xl'} src={image} />
			<Flex alignItems='center' columnGap='0.625rem' height='fit-content'>
				<Typography variant='h5' color={`primary.${lightOrDarkColor}`}>
					Owner:
				</Typography>
				<Typography variant='input' color={darkOrLightColor}>
					{name}
				</Typography>
			</Flex>
			<Flex alignItems='center' columnGap='0.625rem' height='fit-content'>
				<Typography variant='h5' color={`primary.${lightOrDarkColor}`}>
					Email:
				</Typography>
				<Typography variant='input' color={darkOrLightColor}>
					{email}
				</Typography>
			</Flex>
		</Flex>
	);
};

export default OwnerInformation;
