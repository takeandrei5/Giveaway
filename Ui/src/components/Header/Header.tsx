import { UserContext, useUser } from '@auth0/nextjs-auth0';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
	Avatar,
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
	useColorMode,
	useColorModeValue,
} from '@chakra-ui/react';
import { ButtonPrimary, Logo, Typography } from '@components';
import { NextRouter, useRouter } from 'next/router';
import React, { useMemo } from 'react';
import { GrAdd, GrLogin } from 'react-icons/gr';
import { MdAccountCircle } from 'react-icons/md';

import { DEFAULT_AVATAR } from './constants';
import { useLogin } from './hooks';

const Header = (): JSX.Element => {
	const { colorMode, toggleColorMode } = useColorMode();
	const { user, error, isLoading }: UserContext = useUser();
	const router: NextRouter = useRouter();

	const { handleSignIn, handleSignInWithReturnTo, handleSignOut } = useLogin();

	const lightishOrDarkishColor: 'lightish' | 'darkish' = useColorModeValue('lightish', 'darkish');
	const darkishOrWhiteColor: 'darkish' | 'white' = useColorModeValue('darkish', 'white');

	const menuListMemo: JSX.Element = useMemo(
		(): JSX.Element => (
			<MenuList alignItems={'center'} borderRadius='2xl' p={6}>
				<Stack align='center' margin={0}>
					<Typography variant='h3'>Sign in to your account</Typography>
					<Typography variant='input'>to have access to all features 🧙‍♂️</Typography>
				</Stack>
				<Center pt={4}>
					<ButtonPrimary color={lightishOrDarkishColor} leftIcon={<GrLogin fontSize='larger' />} onClick={handleSignIn}>
						<Typography variant='button'>Sign in here</Typography>
					</ButtonPrimary>
				</Center>
			</MenuList>
		),
		[lightishOrDarkishColor, handleSignIn]
	);

	const renderLoginMenu = (): JSX.Element => {
		if (user) {
			return (
				<>
					<MenuButton
						data-testid='menu-button-logged-in'
						_focus={{ boxShadow: 'none' }}
						as={Button}
						rounded='full'
						variant='link'
						cursor='pointer'
						display='inherit'
						minW={0}>
						<Avatar
							data-testid='avatar'
							id={user.picture ? 'provided-picture' : 'default-picture'}
							h='2.5rem'
							w='2.5rem'
							src={user.picture || DEFAULT_AVATAR}
						/>
					</MenuButton>
					<MenuList alignItems='center' borderRadius='2xl' p={6}>
						<Center flexDirection='column' rowGap='0.5rem'>
							<Avatar
								data-testid='menu-list-avatar'
								id={user.picture ? 'menu-list-provided-picture' : 'menu-list-default-picture'}
								size='2xl'
								__css={{ referrerPolicy: 'no-referrer' }}
								src={user.picture || DEFAULT_AVATAR}
							/>
							<Typography variant='paragraph'>{user.name!}</Typography>
						</Center>
						<MenuDivider />
						<MenuItem
							_active={{
								filter: 'brightness(80%) !important',
							}}
							_hover={{
								backgroundColor: lightishOrDarkishColor,
								filter: 'brightness(90%)',
							}}
							borderRadius='lg'
							onClick={handleSignOut}>
							<Typography variant='paragraph'>Logout</Typography>
						</MenuItem>
					</MenuList>
				</>
			);
		}

		return (
			<>
				<MenuButton
					data-testid='menu-button-logged-out'
					_active={{ bg: 'secondary.main', filter: 'brightness(80%)' }}
					_focus={{ boxShadow: 'none', border: 'none' }}
					_hover={{ bg: 'secondary.main', filter: 'brightness(90%)' }}
					as={IconButton}
					rounded='full'
					aria-label='login'
					variant='outline'
					cursor='pointer'
					border='0'
					icon={<Icon as={MdAccountCircle} color={darkishOrWhiteColor} h='1.8rem' width='1.8rem' />}
				/>
				{menuListMemo}
			</>
		);
	};
	return (
		<Skeleton isLoaded={!isLoading}>
			<Flex bg='secondary.main' px={4} h='20' alignItems='center' justifyContent='space-between'>
				<Logo onClick={() => router.push('/listings')} />
				<Stack alignItems='center' direction='row' spacing={7}>
					<ButtonPrimary
						data-testid='create-listing-button'
						color={lightishOrDarkishColor}
						leftIcon={<GrAdd fontSize='larger' />}
						onClick={() => (user ? router.push('/create-listing') : handleSignInWithReturnTo('/create-listing'))}>
						<Typography variant='button'>Create listing</Typography>
					</ButtonPrimary>
					<Button
						bg='secondary.main'
						padding='0'
						_active={{ bg: 'secondary.main', filter: 'brightness(80%)' }}
						_focus={{ border: 'none' }}
						_hover={{ bg: 'secondary.main', filter: 'brightness(90%)' }}
						rounded={'full'}
						onClick={toggleColorMode}>
						<Icon
							data-testid='toggle-color-mode-button'
							as={colorMode === 'light' ? MoonIcon : SunIcon}
							name={colorMode === 'light' ? MoonIcon.displayName : SunIcon.displayName}
							color={darkishOrWhiteColor}
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
