import { handleAuth, handleCallback, Session } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

import createUser from '../../../api/users/createUser';

const afterCallback = async (
	req: NextApiRequest,
	res: NextApiResponse,
	session: Session,
	state: { [key: string]: any }
) => {
	try {
		await createUser(session.accessToken!);
	} catch (err) {
		console.error(err);
	}

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
