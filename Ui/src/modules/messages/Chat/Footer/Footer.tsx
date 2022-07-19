import { Box, Divider, Flex, useColorModeValue } from '@chakra-ui/react';
import { MdSend } from 'react-icons/md';
import TextareaAutosize from 'react-textarea-autosize';
import { MAX_ROWS } from './constants';

import { useFooterMessage } from './hooks';

const Footer = (): JSX.Element => {
	const lightOrDarkColor: 'light' | 'dark' = useColorModeValue('light', 'dark');

	const { message, onKeyDownCallback, onChangeCallback } = useFooterMessage();

	return (
		<>
			<Divider color={`primary.${lightOrDarkColor}`} marginBottom={4} />
			<Flex alignItems='flex-end' columnGap={4} display='flex'>
				<TextareaAutosize
					id='message-input-id'
					maxRows={MAX_ROWS}
					onKeyDown={onKeyDownCallback}
					onChange={onChangeCallback}
					placeholder='Type a message...'
					value={message}
					spellCheck
					style={{
						backgroundColor: 'white',
						border: '0.0625rem solid',
						borderColor: `var(--chakra-colors-primary-${lightOrDarkColor})`,
						borderRadius: 'var(--chakra-radii-2xl)',
						boxShadow: 'var(--chakra-shadows-base)',
						color: 'var(--chakra-colors-dark)',
						flex: 1,
						fontSize: 'var(--chakra-fontSizes-md)',
						fontWeight: 500,
						lineHeight: '1.125rem',
						outline: 'none',
						paddingInline: 'var(--chakra-space-4)',
						paddingBottom: 'var(--chakra-space-2)',
						paddingTop: 'var(--chakra-space-2)',
						position: 'relative',
						resize: 'none',
						transitionDuration: 'var(--chakra-transition-duration-normal)',
						transitionProperty: 'var(--chakra-transition-property-common)',
						verticalAlign: 'top',
					}}
				/>
				<Box
					__css={{
						'& svg': {
							fill: `primary.${lightOrDarkColor}`,
						},
					}}
					marginLeft='auto'>
					<MdSend size='1.75rem' />
				</Box>
			</Flex>
		</>
	);
};

export default Footer;
