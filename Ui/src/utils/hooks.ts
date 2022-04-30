import { useAuth0 } from '@auth0/auth0-react';
import { UserContext, useUser } from '@auth0/nextjs-auth0';
import { NextRouter, useRouter } from 'next/router';
import { useEffect } from 'react';
import { useQuery } from 'react-query';

const useGetAccessToken = (redirectToMainPage: boolean = true) => {
	const router: NextRouter = useRouter();
	const { getAccessTokenSilently } = useAuth0();
	const { user, isLoading }: UserContext = useUser();

	const { isFetched, data } = useQuery(['accessToken'], () => getAccessTokenSilently(), {
		onError: () => {
			if (redirectToMainPage) {
				router.replace('/listings');
			}
		},
		enabled: !isLoading && !!user,
	});

	useEffect(() => {
		if (!user && !isLoading && redirectToMainPage) {
			router.replace('/listings');
			return;
		}
	}, [user, isLoading]);

	return { isFetched, data };
};

export { useGetAccessToken };
