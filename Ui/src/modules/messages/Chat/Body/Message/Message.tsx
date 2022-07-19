import { Avatar, Box, Flex, useColorModeValue } from '@chakra-ui/react';
import { Typography } from '@components';
import { DEFAULT_AVATAR } from '@utils/constants';
import { MessageProps } from './types';

const Message = ({ message, isMine, avatarUrl = DEFAULT_AVATAR }: MessageProps): JSX.Element => {
	const lightOrDarkColor: 'light' | 'dark' = useColorModeValue('light', 'dark');
	const darkOrLightColor: 'dark' | 'light' = useColorModeValue('dark', 'light');

	return (
		<Flex direction='row' marginLeft={isMine ? 'auto' : 'none'} marginRight={!isMine ? 'auto' : 'none'} gap={2}>
			<Avatar
				__css={{ referrerPolicy: 'no-referrer' }}
				data-testid='chat-header-avatar'
				boxShadow='base'
				backgroundColor={isMine ? `primary.${lightOrDarkColor}` : 'gray'}
				marginTop='auto'
				size='2xl'
				h='1.75rem'
				w='1.75rem'
				src={avatarUrl}
			/>
			<Box
				boxShadow='base'
				display='flex'
				flexDirection='row'
				alignItems='center'
				borderRadius='2xl'
				backgroundColor={isMine ? `primary.${lightOrDarkColor}` : 'gray'}
				border={0}
				maxWidth='20rem'
				paddingX={3}
				paddingY={2}>
				<Typography variant='button' multiline color={isMine ? lightOrDarkColor : darkOrLightColor}>
					{message}
				</Typography>
			</Box>
		</Flex>
	);
};

export default Message;
