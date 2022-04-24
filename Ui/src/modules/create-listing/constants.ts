import { CreateListingFormikValues, ImageFormikValue } from './types';
import { v4 as uuidv4 } from 'uuid';

const images: ImageFormikValue[] = Array.from(Array(6)).map(
	(): ImageFormikValue => ({
		id: uuidv4(),
		url: '',
	})
);

const INITIAL_VALUES: CreateListingFormikValues = {
	title: '',
	description: '',
	category: 1,
	images,
};

export { INITIAL_VALUES };
