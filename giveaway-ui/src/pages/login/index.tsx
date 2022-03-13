import { useSession, signIn, signOut } from 'next-auth/react';

export default function Component() {
	const { data: session } = useSession();
	if (session) {
		return (
			<>
				Signed in as {session.user!.email} <br />
				<div style={{ height: '50px' }}>
					{session.user?.image && <img style={{ height: 'auto' }} src={session.user?.image} />}
				</div>
				<button onClick={() => signOut()}>Sign out</button>
			</>
		);
	}
	return (
		<>
			Not signed in <br />
			<button style={{ border: '1px solid black' }} onClick={() => signIn('google')}>
				Sign in
			</button>
		</>
	);
}
