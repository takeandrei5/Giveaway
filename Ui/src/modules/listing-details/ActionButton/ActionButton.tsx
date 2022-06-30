import { useUser } from '@auth0/nextjs-auth0';
import { useColorModeValue } from '@chakra-ui/react';
import { ButtonPrimary, Skeleton, Typography } from '@components';

import { ActionButtonProps } from './types';

const ActionButton = ({ bgColor, icon, label, ownerEmail, onClick }: ActionButtonProps) => {
	const { user, isLoading } = useUser();

	const lightOrDarkColor: 'light' | 'dark' = useColorModeValue('light', 'dark');

	return (
		<Skeleton isLoaded={!isLoading}>
			{user && user.email === ownerEmail && (
				<ButtonPrimary backgroundColor={bgColor} marginLeft='auto' leftIcon={icon} onClick={onClick}>
					<Typography variant='button' color={lightOrDarkColor}>
						{label}
					</Typography>
				</ButtonPrimary>
			)}
		</Skeleton>
	);
};

export default ActionButton;
