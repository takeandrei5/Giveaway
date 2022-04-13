import { useUser } from '@auth0/nextjs-auth0';
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
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import { IoLogInOutline } from 'react-icons/io5';
import { MdAccountCircle } from 'react-icons/md';

import { Typography } from '../../shared';
import Logo from '../../shared/Logo/Logo';

const Header = (): JSX.Element => {
	const { colorMode, toggleColorMode } = useColorMode();
	const router = useRouter();
	const { user, error, isLoading } = useUser();

	const handleSignIn = useCallback(async () => await router.replace('/api/auth/login'), []);
	const handleSignOut = useCallback(() => router.replace('/api/auth/logout'), []);

	const lightishOrDarkishColor: 'lightish' | 'darkish' = useColorModeValue('lightish', 'darkish');
	const darkishOrWhiteColor: 'darkish' | 'white' = useColorModeValue('darkish', 'white');

	const renderMenu = useCallback((): JSX.Element => {
		if (user) {
			return (
				<>
					<MenuButton
						_focus={{ boxShadow: 'none' }}
						as={Button}
						rounded={'full'}
						variant={'link'}
						cursor={'pointer'}
						display={!user ? 'none' : 'inherit'}
						minW={0}>
						<Avatar
							h='2.5rem'
							w='2.5rem'
							src={user && user.picture ? user.picture : 'https://avatars.dicebear.com/api/male/username.svg'}
						/>
					</MenuButton>
					<MenuList alignItems={'center'} borderRadius='2xl' p={6}>
						<Center>
							<Avatar
								size={'2xl'}
								src={user && user.picture ? user.picture : 'https://avatars.dicebear.com/api/male/username.svg'}
							/>
						</Center>
						<br />
						<Center>
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
							onClick={() => handleSignOut()}>
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
					aria-label='Options'
					variant='outline'
					cursor='pointer'
					border='0'
					icon={<Icon as={MdAccountCircle} color={darkishOrWhiteColor} h='1.8rem' width='1.8rem' />}
				/>
				<MenuList alignItems={'center'} borderRadius='2xl' p={6}>
					<Stack align='center'>
						<Typography variant='h3'>Sign in to your account</Typography>
						<Typography variant='input'>to enjoy all of our cool features ✌️</Typography>
					</Stack>
					<Center pt={4}>
						<Button
							_active={{
								filter: 'brightness(80%) !important',
							}}
							_focus={{ boxShadow: 'none' }}
							_hover={{
								filter: 'brightness(90%)',
							}}
							backgroundColor={lightishOrDarkishColor}
							border={0}
							w={'full'}
							maxW={'md'}
							variant={'outline'}
							leftIcon={<IoLogInOutline />}
							onClick={() => handleSignIn()}>
							<Typography variant='button'>Sign in here</Typography>
						</Button>
					</Center>
				</MenuList>
			</>
		);
	}, [isLoading]);

	return (
		<Skeleton isLoaded={!isLoading}>
			<Box bg={useColorModeValue('secondary.main', 'secondary.main')} px={4}>
				<Flex h={'20'} alignItems={'center'} justifyContent={'space-between'}>
					<Logo />
					<Flex alignItems={'center'}>
						<Stack direction={'row'} spacing={7}>
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
									color={useColorModeValue('darkish', 'white')}
									height='1.5rem'
									width='1.5rem'
								/>
							</Button>
							<Menu autoSelect={false}>{renderMenu()}</Menu>
						</Stack>
					</Flex>
				</Flex>
			</Box>
		</Skeleton>
	);
};
export default Header;
