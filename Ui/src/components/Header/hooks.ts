import { NextRouter, useRouter } from 'next/router';
import { useCallback } from 'react';

const useLogin = () => {
	const router: NextRouter = useRouter();

	const handleSignIn: () => Promise<boolean> = useCallback(
		async () => await router.replace('/api/auth/login'),
		[router]
	);
	const handleSignInWithReturnTo: (returnTo: string) => Promise<boolean> = useCallback(
		async (returnTo: string) => await router.replace(`/api/auth/login?returnTo=${returnTo}`),
		[router]
	);
	const handleSignOut: () => Promise<boolean> = useCallback(() => router.replace('/api/auth/logout'), [router]);

	return { handleSignIn, handleSignInWithReturnTo, handleSignOut };
};

export { useLogin };
