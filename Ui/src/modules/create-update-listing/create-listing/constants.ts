import { v4 as uuidv4 } from 'uuid';

import { FormikValues, ImageFormikValue } from '../shared/types';

const images: ImageFormikValue[] = Array.from(Array(6)).map(
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
