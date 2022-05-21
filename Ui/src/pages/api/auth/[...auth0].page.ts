import { createUser } from '@api/users';
import { handleAuth, handleCallback, Session } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

const afterCallback = async (req: NextApiRequest, res: NextApiResponse, session: Session) => {
	await createUser(session.accessToken!);

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
