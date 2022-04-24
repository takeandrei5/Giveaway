import { GetServerSidePropsContext, NextPage, Redirect } from 'next';

import { CreateListingModule } from '../../modules';
import { fetchAccessToken } from '../../utils/helpers';
import { CreateListingPageProps } from './types';

const CreateListingPage: NextPage<CreateListingPageProps> = ({ accessToken }: CreateListingPageProps) => (
	<CreateListingModule accessToken={accessToken} />
);

export async function getServerSideProps(
	context: GetServerSidePropsContext
): Promise<{ props: CreateListingPageProps } | { redirect: Redirect }> {
	const accessToken: string | undefined = await fetchAccessToken(context);

	if (!accessToken) {
		return {
			redirect: {
				destination: '/listings',
				permanent: true,
			},
		};
	}

	return {
		props: {
			accessToken,
		},
	};
}

export default CreateListingPage;
