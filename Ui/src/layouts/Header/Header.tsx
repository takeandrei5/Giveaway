import { UserContext, useUser } from '@auth0/nextjs-auth0';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
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
	useColorMode,
	useColorModeValue,
} from '@chakra-ui/react';
import { NextRouter, useRouter } from 'next/router';
import React from 'react';
import { useMemo } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import { IoLogInOutline } from 'react-icons/io5';
import { MdAccountCircle } from 'react-icons/md';

import { Typography } from '../../components/shared';
import ButtonPrimary from '../../components/shared/Buttons/ButtonPrimary';
import Logo from '../../components/shared/Logo/Logo';
import useLogin from './hooks';

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
					<ButtonPrimary
						color={lightishOrDarkishColor}
						leftIcon={<IoLogInOutline fontSize='larger' />}
						onClick={handleSignIn}>
						<Typography variant='button'>Sign in here</Typography>
					</ButtonPrimary>
				</Center>
			</MenuList>
		),
		[]
	);

	const loginMenuMemo: JSX.Element = useMemo((): JSX.Element => {
		if (user) {
			return (
				<>
					<MenuButton
						_focus={{ boxShadow: 'none' }}
						as={Button}
						rounded='full'
						variant='link'
						cursor='pointer'
						display={!user ? 'none' : 'inherit'}
						minW={0}>
						<Avatar
							h='2.5rem'
							w='2.5rem'
							src={user && user.picture ? user.picture : 'https://avatars.dicebear.com/api/male/username.svg'}
						/>
					</MenuButton>
					<MenuList alignItems='center' borderRadius='2xl' p={6}>
						<Center flexDirection='column' rowGap='0.5rem'>
							<Avatar
								size='2xl'
								src={user && user.picture ? user.picture : 'https://avatars.dicebear.com/api/male/username.svg'}
							/>
							<Typography variant='paragraph'>{user?.name || ''}</Typography>
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
	}, [isLoading, lightishOrDarkishColor, darkishOrWhiteColor]);

	return (
		<Skeleton isLoaded={!isLoading}>
			<Flex bg='secondary.main' px={4} h='20' alignItems='center' justifyContent='space-between'>
				<Logo onClick={() => router.push('/listings')} />
				<Stack alignItems='center' direction='row' spacing={7}>
					<ButtonPrimary
						color={lightishOrDarkishColor}
						leftIcon={<FaPlusCircle fontSize='larger' />}
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
							as={colorMode === 'light' ? MoonIcon : SunIcon}
							color={darkishOrWhiteColor}
							height='1.5rem'
							width='1.5rem'
						/>
					</Button>
					<Menu autoSelect={false}>{loginMenuMemo}</Menu>
				</Stack>
			</Flex>
		</Skeleton>
	);
};
export default React.memo(Header);
