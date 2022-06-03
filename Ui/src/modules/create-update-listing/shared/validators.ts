import { CategoryTypeEnum } from '@utils/enums';
import * as yup from 'yup';
import { ImageFormikValue } from './types';

const validationSchema = yup.object({
	title: yup
		.string()
		.required('Title is required.')
		.min(5, 'Title cannot be shorter than 5 characters.')
		.max(50, 'Title cannot exceed 50 characters.'),
	description: yup
		.string()
		.required('Description is required.')
		.min(5, 'Description cannot be shorter than 5 characters.')
		.max(1000, 'Description cannot exceed 1000 characters.'),
	category: yup
		.number()
		.min(1, 'Category out of bounds.')
		.max(Object.keys(CategoryTypeEnum).length, 'Category out of bounds.'),
	images: yup
		.array()
		.of(yup.object().shape({ id: yup.string(), url: yup.string() }))
		.min(1, 'Listing must contain at least an image.')
		.test('Thumbnail test', 'Listing must have a thumbnail image.', function (value) {
			return !!value && !!value[0] && !!value[0].id && !!value[0].url;
		}),
});

export { validationSchema };
