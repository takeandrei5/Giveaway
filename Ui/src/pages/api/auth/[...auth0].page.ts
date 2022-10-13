import { createUser as createChatApiUser } from '@api/chatapi/users/server-side';
import { createUser as createWebApiUser } from '@api/webapi/users/server-side';
import { getSession, handleAuth, handleCallback, Session } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

const afterCallback = async (_: NextApiRequest, __: NextApiResponse, session: Session) => {
	await createWebApiUser(session.accessToken!);

	return session;
};

export default handleAuth({
	async callback(req: NextApiRequest, res: NextApiResponse) {
		try {
			await handleCallback(req, res, { afterCallback });
		} catch (error) {
			console.error(error);
		}
	},
});
