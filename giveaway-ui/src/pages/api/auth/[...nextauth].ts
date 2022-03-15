import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
			authorization: {
				params: {
					prompt: 'consent',
					access_type: 'offline',
					response_type: 'code',
				},
			},
		}),
	],
	secret: process.env.SECRET,
	callbacks: {
		async signIn(params) {
			if (params.account.provider === 'google') {
				return Boolean(
					params.profile &&
						params.profile.email &&
						params.profile.email.endsWith('@gmail.com') &&
						params.profile.email_verified
				);
			}
			return true; // Do different verification for other providers that don't have `email_verified`
		},
		async jwt(params) {
			if (params.account?.accessToken) {
				params.token.accessToken = params.account.accessToken;
			}

			return params.token;
		},
	},
});
