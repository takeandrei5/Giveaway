import { UpdateListingInitialValues } from '../../../pages/update-listing/[id]/types';

export type UpdateListingModuleProps = {
	accessToken: string;
	id: string;
	initialValues: UpdateListingInitialValues;
};
