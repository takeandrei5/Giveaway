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
  Stack,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { MdAccountCircle } from 'react-icons/md';

import { Typography } from '../../shared';
import Logo from '../../shared/Logo/Logo';

const Header = (): JSX.Element => {
	const { colorMode, toggleColorMode } = useColorMode();

	const { data: session, status } = useSession();

	const renderMenu = () => {
		if (status === 'authenticated' && session) {
			return (
				<>
					<MenuButton
						_focus={{ boxShadow: 'none' }}
						as={Button}
						rounded={'full'}
						variant={'link'}
						cursor={'pointer'}
						minW={0}>
						<Avatar
							h='2.5rem'
							w='2.5rem'
							src={
								session.user?.image
									? session.user.image
									: 'https://avatars.dicebear.com/api/male/username.svg'
							}
						/>
					</MenuButton>
					<MenuList alignItems={'center'} borderRadius='2xl' p={6}>
						<Center>
							<Avatar
								size={'2xl'}
								src={
									session.user?.image
										? session.user.image
										: 'https://avatars.dicebear.com/api/male/username.svg'
								}
							/>
						</Center>
						<br />
						<Center>
							<Typography variant='paragraph'>{session.user?.name!}</Typography>
						</Center>
						<MenuDivider />
						<MenuItem
							_active={{
								filter: 'brightness(80%) !important',
							}}
							_hover={{
								backgroundColor: useColorModeValue('grayish', 'darkish'),
								filter: 'brightness(90%)',
							}}
							borderRadius='lg'
							onClick={() => signOut()}>
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
					icon={
						<Icon
							as={MdAccountCircle}
							color={useColorModeValue('darkish', 'white')}
							h='1.8rem'
							width='1.8rem'
						/>
					}
				/>
				<MenuList alignItems={'center'} borderRadius='2xl' p={6}>
					<Stack align='center'>
						<Typography variant='h3'>Sign in to your account</Typography>
						<Typography variant='input'>to enjoy all of our cool ✌️</Typography>
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
							backgroundColor={useColorModeValue('grayish', 'darkish')}
							border={0}
							w={'full'}
							maxW={'md'}
							variant={'outline'}
							leftIcon={<FcGoogle />}
							onClick={() => signIn('google')}>
							<Typography variant='button'>Sign in with Google</Typography>
						</Button>
					</Center>
				</MenuList>
			</>
		);
	};

	return (
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
	);
};
export default Header;
