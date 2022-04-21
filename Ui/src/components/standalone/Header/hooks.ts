import { useRouter } from 'next/router';
import { useCallback } from 'react';

const useLogin = () => {
	const router = useRouter();

	const handleSignIn = useCallback(async () => await router.replace('/api/auth/login'), []);
	const handleSignOut = useCallback(() => router.replace('/api/auth/logout'), []);

	return { handleSignIn, handleSignOut };
};

export default useLogin;
