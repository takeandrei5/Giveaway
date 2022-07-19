import { CreateListingModule } from '@modules';
import { NextPage } from 'next';
import { useLayoutEffect } from 'react';

const CreateListingPage: NextPage = () => {
	useLayoutEffect(() => {
		window.scrollTo(0, document.getElementById('header')!.getBoundingClientRect().height);
	}, []);

	return <CreateListingModule />;
};

export default CreateListingPage;
