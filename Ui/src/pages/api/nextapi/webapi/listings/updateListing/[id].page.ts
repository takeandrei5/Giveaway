import { updateListing } from '@api/webapi/listings/server-side';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(updateListing);
