import { UserContext, useUser } from '@auth0/nextjs-auth0';
import {
	Avatar,
	Box,
	Button,
	Center,
	Flex,
	Icon,
	IconButton,
	Menu,
	MenuButton,
	MenuDivider,
	MenuItem,
	MenuList,
	Skeleton,
	Stack,
	useColorModeValue,
} from '@chakra-ui/react';
import { ButtonPrimary, Logo, Typography } from '@components';
import { DEFAULT_AVATAR } from '@utils/constants';
import { NextRouter, useRouter } from 'next/router';
import React, { useCallback, useMemo } from 'react';
import { GrAdd, GrLogin, GrLogout } from 'react-icons/gr';
import { MdAccountCircle, MdChatBubble } from 'react-icons/md';

import { useLogin } from './hooks';

const Header = (): JSX.Element => {
	const { user, error, isLoading }: UserContext = useUser();
	const router: NextRouter = useRouter();

	const { handleSignIn, handleSignInWithReturnTo, handleSignOut } = useLogin();

	const lightOrDarkColor: 'light' | 'dark' = useColorModeValue('light', 'dark');
	const darkOrLightColor: 'dark' | 'light' = useColorModeValue('dark', 'light');

	const menuListMemo: JSX.Element = useMemo(
		(): JSX.Element => (
			<MenuList alignItems={'center'} border={0} borderRadius='2xl' boxShadow='base' bgColor='white' p={6}>
				<Stack align='center' margin={0}>
					<Typography variant='h3' color={darkOrLightColor}>
						Sign in to your account
					</Typography>
					<Typography variant='input' color={darkOrLightColor}>
						to have access to all features 🧙‍♂️
					</Typography>
				</Stack>
				<Center pt={4}>
					<ButtonPrimary leftIcon={<GrLogin fontSize='larger' />} onClick={handleSignIn}>
						<Typography variant='button' color={lightOrDarkColor}>
							Sign in here
						</Typography>
					</ButtonPrimary>
				</Center>
			</MenuList>
		),
		[lightOrDarkColor, handleSignIn]
	);

	const renderLoginMenu = (): JSX.Element => {
		if (user) {
			return (
				<>
					<MenuButton
						data-testid='menu-button-logged-in'
						_focus={{ boxShadow: 'none' }}
						as={Box}
						rounded='full'
						variant='link'
						cursor='pointer'
						userSelect='none'
						display='inherit'
						minW={0}>
						<Avatar
							__css={{ referrerPolicy: 'no-referrer' }}
							data-testid='avatar'
							boxShadow='base'
							id={user.picture ? 'provided-picture' : 'default-picture'}
							bgColor={`primary.${lightOrDarkColor}`}
							h='2.5rem'
							w='2.5rem'
							src={user.picture || DEFAULT_AVATAR}
						/>
					</MenuButton>
					<MenuList alignItems='center' border={0} borderRadius='2xl' bgColor={lightOrDarkColor} p={6}>
						<Center flexDirection='column' rowGap='0.5rem'>
							<Avatar
								__css={{ referrerPolicy: 'no-referrer' }}
								boxShadow='base'
								data-testid='menu-list-avatar'
								id={user.picture ? 'menu-list-provided-picture' : 'menu-list-default-picture'}
								size='2xl'
								src={user.picture || DEFAULT_AVATAR}
							/>
							<Typography variant='input' color={darkOrLightColor}>
								{user.name!}
							</Typography>
						</Center>
						<MenuDivider color={`primary.${lightOrDarkColor}`} />
						<MenuItem>
							<ButtonPrimary leftIcon={<GrLogout fontSize='larger' />} onClick={handleSignOut} width='100%'>
								<Typography variant='input' color={lightOrDarkColor}>
									Logout
								</Typography>
							</ButtonPrimary>
						</MenuItem>
					</MenuList>
				</>
			);
		}

		return (
			<>
				<MenuButton
					data-testid='menu-button-logged-out'
					_active={{ bg: `secondary.${lightOrDarkColor}`, filter: 'brightness(80%)' }}
					_focus={{ boxShadow: 'none', border: 'none' }}
					_hover={{ bg: `secondary.${lightOrDarkColor}`, filter: 'brightness(90%)' }}
					as={IconButton}
					rounded='full'
					aria-label='login'
					variant='outline'
					cursor='pointer'
					border='0'
					marginLeft={0}
					icon={<Icon as={MdAccountCircle} color={lightOrDarkColor} h='1.8rem' width='1.8rem' />}
				/>
				{menuListMemo}
			</>
		);
	};

	const onMessageIconClicked = useCallback((): Promise<boolean> => {
		if (user) {
			return router.push('/messages');
		}

		return handleSignInWithReturnTo('/messages');
	}, [user]);

	return (
		<Skeleton boxShadow='base' id='header' isLoaded={!isLoading}>
			<Flex
				boxShadow='base'
				position='relative'
				bg={`secondary.${lightOrDarkColor}`}
				px={4}
				h='20'
				alignItems='center'
				justifyContent='space-between'>
				<Logo onClick={() => router.push('/listings')} />
				<Stack alignItems='center' direction='row' spacing={4}>
					<ButtonPrimary
						data-testid='create-listing-button'
						leftIcon={<GrAdd fontSize='larger' />}
						onClick={() => (user ? router.push('/create-listing') : handleSignInWithReturnTo('/create-listing'))}>
						<Typography variant='button' color={lightOrDarkColor}>
							Create listing
						</Typography>
					</ButtonPrimary>
					<Button
						_active={{ bgColor: `secondary.${lightOrDarkColor}`, filter: 'brightness(80%)' }}
						_focus={{ border: 'none' }}
						_hover={{ bgColor: `secondary.${lightOrDarkColor}`, filter: 'brightness(90%)' }}
						data-testid='messages-button'
						padding={0}
						rounded='full'
						onClick={onMessageIconClicked}>
						<Icon
							data-testid='header-messages-button'
							as={MdChatBubble}
							dropShadow='base'
							color={`primary.${lightOrDarkColor}`}
							height='1.5rem'
							width='1.5rem'
						/>
					</Button>
					<Menu autoSelect={false}>{renderLoginMenu()}</Menu>
				</Stack>
			</Flex>
		</Skeleton>
	);
};
export default React.memo(Header);
