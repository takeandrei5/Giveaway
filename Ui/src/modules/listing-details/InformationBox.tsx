import { Flex } from '@chakra-ui/react';
import dateFormat from 'dateformat';

import { Typography } from '../../components';
import { InformationBoxProps } from './types';

const InformationBox = ({ title, description, createdAt }: InformationBoxProps): JSX.Element => (
	<Flex
		direction='column'
		borderRadius='2xl'
		bgColor='white'
		padding='1.5rem'
		height='100%'
		maxWidth='100%'
		rowGap='0.625rem'>
		<Typography variant='caption' prefix='Added on: '>
			{dateFormat(createdAt, 'mmmm dS, yyyy "at" h:MM TT')}
		</Typography>
		<Typography variant='h3'>{title}</Typography>
		<Typography variant='paragraph' multiline>
			{description}
		</Typography>
	</Flex>
);

export default InformationBox;
