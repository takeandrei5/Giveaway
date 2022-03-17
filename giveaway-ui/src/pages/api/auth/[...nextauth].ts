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
			if (params.account.provider === 'google') {
				return Boolean(params.profile && params.profile.email && params.profile.email_verified);
			}
			return true;
		},
		async jwt(params) {
			if (params.account?.accessToken) {
				params.token.accessToken = params.account.accessToken;
			}

			// params
			// const secret = process.env.SECRET;
			// console.log(await getToken({ params., secret }));

			// try {
			// 	await axiosInstance.post('users');
			// } catch (err) {
			// 	console.log(err);
			// }

			return params.token;
		},
	},
});
