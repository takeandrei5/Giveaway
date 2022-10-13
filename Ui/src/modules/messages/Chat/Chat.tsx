import { Flex } from '@chakra-ui/react';
import { DEFAULT_AVATAR } from '@utils/constants';

import { Body } from './Body';
import { Footer } from './Footer';
import { Header } from './Header';

const Chat = (): JSX.Element => {
	return (
		<Flex bgColor='white' borderRadius='2xl' boxShadow='base' direction='column' flex={3} padding={6} maxHeight='100%'>
			<Header avatarUrl={DEFAULT_AVATAR} name='Andrei Tache' email='takeandrei5@gmail.com' />
			<Flex flexDirection='column' flexGrow={1}>
				<Body />
				<Footer />
			</Flex>
		</Flex>
	);
};

export default Chat;
