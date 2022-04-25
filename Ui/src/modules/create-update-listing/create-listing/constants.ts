import { v4 as uuidv4 } from 'uuid';
import { MAX_IMAGES } from '../../../utils/constants';

import { FormikValues, ImageFormikValue } from '../shared/types';

const images: ImageFormikValue[] = Array.from(Array(MAX_IMAGES)).map(
	(): ImageFormikValue => ({
		id: uuidv4(),
		url: '',
	})
);

const INITIAL_VALUES: FormikValues = {
	title: '',
	description: '',
	category: 1,
	images,
};

export default INITIAL_VALUES;
