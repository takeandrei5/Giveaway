import { useRouter } from 'next/router';
import { useCallback } from 'react';

const useLogin = () => {
	const router = useRouter();

	const handleSignIn = useCallback(async () => await router.replace('/api/auth/login'), []);
	const handleSignInWithReturnTo = async (returnTo: string) =>
		await router.replace(`/api/auth/login?returnTo=${returnTo}`);
	const handleSignOut = useCallback(() => router.replace('/api/auth/logout'), []);

	return { handleSignIn, handleSignInWithReturnTo, handleSignOut };
};

export default useLogin;
