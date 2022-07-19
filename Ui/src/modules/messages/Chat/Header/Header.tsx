import { Avatar, Box, Divider, Flex, Stack, useColorModeValue } from '@chakra-ui/react';
import { Typography } from '@components';

import { HeaderProps } from './types';

const Header = ({ avatarUrl, name, email }: HeaderProps): JSX.Element => {
	const lightOrDarkColor: 'light' | 'dark' = useColorModeValue('light', 'dark');
	const darkOrLightColor: 'dark' | 'light' = useColorModeValue('dark', 'light');

	return (
		<>
			<Flex direction='row' alignItems='center' columnGap={2} height={12}>
				<Avatar
					__css={{ referrerPolicy: 'no-referrer' }}
					boxShadow='base'
					bgColor={`primary.${lightOrDarkColor}`}
					data-testid='chat-header-avatar'
					size='2xl'
					h='2.5rem'
					w='2.5rem'
					src={avatarUrl}
				/>
				<Flex direction='column'>
					<Typography variant='h5' color={darkOrLightColor}>
						{name}
					</Typography>
					<Typography variant='small' color={darkOrLightColor}>
						{email}
					</Typography>
				</Flex>
			</Flex>
			<Divider color={`primary.${lightOrDarkColor}`} />
		</>
	);
};

export default Header;
