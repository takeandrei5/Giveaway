import { useAuth0 } from '@auth0/auth0-react';
import { UserContext, useUser } from '@auth0/nextjs-auth0';
import { NextRouter, useRouter } from 'next/router';
import { useEffect, useMemo, useRef } from 'react';
import { useQuery } from 'react-query';

const useGetAccessToken = (redirectTo: string = '', enableRedirect = false) => {
	const router: NextRouter = useRouter();
	const { getAccessTokenSilently } = useAuth0();
	const { user, isLoading }: UserContext = useUser();

	const { isFetched, data } = useQuery(['accessToken'], () => getAccessTokenSilently(), {
		onError: () => redirect(redirectTo),

		enabled: !isLoading && !!user,
	});

	const redirect = (redirectTo: string) => {
		console.log('hi');

		if (!redirectTo) {
			router.replace('/listings');
			return;
		}
		router.replace(redirectTo);
	};

	useEffect(() => {
		if (!user && !isLoading && enableRedirect) {
			redirect(redirectTo);
		}
	}, [user, isLoading]);

	return { isFetched, data };
};

export { useGetAccessToken };
