import { getServerSidePropsWrapper } from '@auth0/nextjs-auth0';
import { ListingsModule } from '@modules';
import { NextPage } from 'next/types';
import { useLayoutEffect } from 'react';

import { ListingsPageProps } from './types';
import { getListingsServerSideProps } from './utils';

const ListingsPage: NextPage<ListingsPageProps> = ({ options }: ListingsPageProps) => {
	useLayoutEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return <ListingsModule options={options} />;
};

export const getServerSideProps = getServerSidePropsWrapper(getListingsServerSideProps);

export default ListingsPage;
