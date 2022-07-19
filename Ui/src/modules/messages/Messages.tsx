import { Flex, useColorModeValue } from '@chakra-ui/react';
import { ButtonPrimary, Skeleton, Typography } from '@components';
import { NextRouter, useRouter } from 'next/router';
import { GrFormPrevious } from 'react-icons/gr';

import { Chat } from './Chat';
import { Persons } from './Persons';

const Messages = (): JSX.Element => {
	const router: NextRouter = useRouter();

	const lightOrDarkColor: 'light' | 'dark' = useColorModeValue('light', 'dark');

	return (
		<Skeleton borderRadius='2xl' display='flex' flex={1} flexDirection='column' isLoaded={true} gap={2}>
			<Typography variant='h1' color={`primary.${lightOrDarkColor}`}>
				Messages
			</Typography>
			<ButtonPrimary
				backgroundColor={`primary.${lightOrDarkColor}`}
				leftIcon={<GrFormPrevious fontSize='medium' />}
				onClick={() => router.push('/listings')}
				width='fit-content'>
				<Typography variant='button' color={lightOrDarkColor}>
					Back
				</Typography>
			</ButtonPrimary>
			<Flex direction='row' flex={1} columnGap={3}>
				<Persons />
				<Chat />
			</Flex>
		</Skeleton>
	);
};

export default Messages;
