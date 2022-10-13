import { FetchListingDetailsResponse } from '@api/webapi/listings/types';
import { FormikValues } from '@modules/create-update-listing/shared/types';
import { DehydratedState } from '@utils/types';

export type UpdateListingInitialValues = Omit<FormikValues, 'images'> & { images: string[] };

export type UpdateListingPageProps = Omit<FetchListingDetailsResponse, 'ownerInfo'> & { id: string } & DehydratedState;
