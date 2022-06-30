import { Box, Divider, Flex, useColorModeValue } from '@chakra-ui/react';
import { Typography } from '@components';
import dateFormat from 'dateformat';

import { ListingInformationProps } from './types';

const InformationBox = ({ title, description, createdAt }: ListingInformationProps): JSX.Element => {
	const lightOrDarkColor: 'light' | 'dark' = useColorModeValue('light', 'dark');
	const darkOrLightColor: 'dark' | 'light' = useColorModeValue('dark', 'light');

	return (
		<Flex
			direction='column'
			borderRadius='2xl'
			bgColor='white'
			padding='1.5rem'
			height='100%'
			maxWidth='100%'
			rowGap='0.375rem'>
			<Typography variant='h3' color={`primary.${lightOrDarkColor}`}>
				{title}
			</Typography>
			<Typography variant='paragraph' color={darkOrLightColor} multiline>
				{description}
			</Typography>
			<Box marginTop='auto'>
				<Typography variant='caption' color={darkOrLightColor} prefix='Added on: '>
					{dateFormat(createdAt, 'mmmm dS, yyyy "at" h:MM TT')}
				</Typography>
			</Box>
		</Flex>
	);
};

export default InformationBox;
