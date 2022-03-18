import NextAuth from 'next-auth';
import Auth0Provider from 'next-auth/providers/auth0';

export default NextAuth({
	providers: [
		Auth0Provider({
			clientId: process.env.AUTH0_ID!,
			clientSecret: process.env.AUTH0_SECRET!,
			issuer: process.env.AUTH0_DOMAIN!,
		}),
	],
	secret: process.env.SECRET,
	callbacks: {
		async signIn(params) {
			console.log(params);
			if (params.account.provider === 'google') {
				return Boolean(params.profile && params.profile.email && params.profile.email_verified);
			}
			return true;
		},
		async jwt(params) {
			if (params.account?.accessToken) {
				params.token.accessToken = params.account.accessToken;
			}
			return params.token;
		},
		async session({ session, token, user }) {
			// Send properties to the client, like an access_token from a provider.
			session.accessToken = token.accessToken;
			console.log(session)
			return session;
		},
	},
});
