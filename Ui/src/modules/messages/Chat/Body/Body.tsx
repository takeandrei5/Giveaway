import { Flex } from '@chakra-ui/react';
import { DEFAULT_AVATAR } from '@utils/constants';
import { useLayoutEffect, useRef } from 'react';

import { Message } from './Message';

const Body = (): JSX.Element => {
	const renderMessages = (): JSX.Element[] => {
		return [
			'Hi there!',
			'How are you?',
			'I am fine, thank you!',
			'What about you?',
			'Great!',
			'I am fine, thank you!',
			'This is a long test! This is a long test! This is a long test! This is a long test!',
			'This is a long test! This is a long test! This is a long test! This is a long test!',
			'This is a long test! This is a long test! This is a long test! This is a long test!',
			'This is a long test! This is a long test! This is a long test! This is a long test!',
			'This is a long test! This is a long test! This is a long test! This is a long test! This is a long test! This is a long test! This is a long test! This is a long test! This is a long test! This is a long test! This is a long test! This is a long test! This is a long test! This is a long test! This is a long test! This is a long test!',
			'Last message by me!',
			'Last message by me! 1235',
		]
			.reverse()
			.map(
				(message: string, index: number): JSX.Element => (
					<Message key={`${message}-${index}`} message={message} avatarUrl={DEFAULT_AVATAR} isMine={index % 2 === 0} />
				)
			);
	};

	return (
		<Flex
			id='test'
			flexBasis='0'
			flexGrow={1}
			direction='column-reverse'
			rowGap={2}
			paddingY={4}
			paddingX={3}
			overflow='auto'>
			{renderMessages()}
		</Flex>
	);
};

export default Body;
