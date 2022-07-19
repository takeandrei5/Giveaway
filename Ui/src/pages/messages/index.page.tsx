import { MessagesModule } from '@modules/messages';
import { NextPage } from 'next';
import { useLayoutEffect } from 'react';

const MessagesPage: NextPage = () => {
	useLayoutEffect(() => {
		window.scrollTo(0, document.getElementById('header')!.getBoundingClientRect().height);
	}, []);

	return <MessagesModule />;
};

export default MessagesPage;
