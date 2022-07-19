import { Avatar, Flex, useColorModeValue } from '@chakra-ui/react';
import { Typography } from '@components';
import dateFormat from 'dateformat';
import React from 'react';
import { useCallback } from 'react';

import { PersonProps } from './types';

const Person = ({ avatarUrl, name, lastMessageDate }: PersonProps): JSX.Element => {
	const lightOrDarkColor: 'light' | 'dark' = useColorModeValue('light', 'dark');
	const darkOrLightColor: 'dark' | 'light' = useColorModeValue('dark', 'light');

	const formatDate = useCallback(
		(date: Date): string => dateFormat(date, 'mmmm dS, yyyy "at" h:MM TT'),
		[lastMessageDate]
	);

	return (
		<Flex
			_hover={{
				cursor: 'pointer',
				filter: 'brightness(90%)',
			}}
			_active={{
				filter: 'brightness(80%)',
			}}
			borderRadius='2xl'
			backgroundColor='white'
			direction='row'
			alignItems='center'
			columnGap={2}
			userSelect='none'
			padding={3}>
			<Avatar
				__css={{ referrerPolicy: 'no-referrer' }}
				boxShadow='base'
				bgColor={`primary.${lightOrDarkColor}`}
				data-testid='chat-header-avatar'
				size='2xl'
				h='3.5rem'
				w='3.5rem'
				src={avatarUrl}
			/>
			<Flex direction='column' alignItems='flex-start'>
				<Typography variant='default' color={darkOrLightColor}>
					{name}
				</Typography>
				<Typography variant='small' color={darkOrLightColor}>
					{`Last message on: ${formatDate(lastMessageDate)}`}
				</Typography>
			</Flex>
		</Flex>
	);
};

export default React.memo(Person);
