import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { UpdateListingModule } from '@modules';
import { NextPage } from 'next';
import { useLayoutEffect } from 'react';

import { UpdateListingPageProps } from './types';
import { getUpdateListingServerSideProps } from './utils';

const UpdateListingPage: NextPage<UpdateListingPageProps> = ({ id, listingInfo }: UpdateListingPageProps) => {
	useLayoutEffect(() => {
		window.scrollTo(0, document.getElementById('header')!.getBoundingClientRect().height);
	}, []);

	return <UpdateListingModule id={id} initialValues={listingInfo} />;
};

export const getServerSideProps = withPageAuthRequired({
	getServerSideProps: getUpdateListingServerSideProps,
});

export default UpdateListingPage;
