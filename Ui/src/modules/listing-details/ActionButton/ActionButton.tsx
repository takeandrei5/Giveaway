import { useUser } from '@auth0/nextjs-auth0';
import { useColorModeValue } from '@chakra-ui/react';
import { ButtonPrimary, Skeleton, Typography } from 'components';

import { ActionButtonProps } from './types';

const ActionButton = ({ bgColor, icon, label, ownerEmail, onClick }: ActionButtonProps) => {
	const { user, error, isLoading } = useUser();

	const lightishOrDarkishColor: 'lightish' | 'darkish' = useColorModeValue('lightish', 'darkish');

	return (
		<Skeleton isLoaded={!isLoading}>
			{user && user.email === ownerEmail && (
				<ButtonPrimary
					color={lightishOrDarkishColor}
					backgroundColor={bgColor}
					marginLeft='auto'
					leftIcon={icon}
					onClick={onClick}>
					<Typography variant='button'>{label}</Typography>
				</ButtonPrimary>
			)}
		</Skeleton>
	);
};

export default ActionButton;
