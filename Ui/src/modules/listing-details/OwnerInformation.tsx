import { Avatar, Center, Divider, Flex } from '@chakra-ui/react';

import { Typography } from '../../components';
import { OwnerInformationProps } from './types';

const OwnerInformation = ({ email, name, image }: OwnerInformationProps): JSX.Element => (
	<Flex
		alignItems='center'
		height='100%'
		flexDirection='column'
		borderRadius='2xl'
		bgColor='white'
		padding='1.5rem'
		maxWidth='100%'
		rowGap='0.375rem'>
		<Typography center variant='h3'>
			Contact Information
		</Typography>
		<Divider />
		<Avatar size={'2xl'} src={image} />
		<Flex alignItems='center' columnGap='0.625rem' height='fit-content'>
			<Typography variant='h5'>Owner:</Typography>
			<Typography variant='paragraph'>{name}</Typography>
		</Flex>
		<Flex alignItems='center' columnGap='0.625rem' height='fit-content'>
			<Typography variant='h5'>Email:</Typography>
			<Typography variant='paragraph'>{email}</Typography>
		</Flex>
	</Flex>
);

export default OwnerInformation;
