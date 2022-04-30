import { FormikValues } from 'modules/create-update-listing/shared/types';
import { DehydratedState } from 'utils/types';

export type UpdateListingInitialValues = Omit<FormikValues, 'images'> & { images: string[] };

export type UpdateListingPageProps = { accessToken: string } & DehydratedState & { id: string };
