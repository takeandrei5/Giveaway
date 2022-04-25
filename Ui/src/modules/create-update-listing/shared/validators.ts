import * as yup from 'yup';

import { CategoryTypeEnum } from '../../../utils/enums';

const validationSchema = yup.object({
	title: yup
		.string()
		.max(50, 'Title cannot exceed 50 characters.')
		.min(5, 'Title cannot be shorter than 5 characters.')
		.required('Title is required.'),
	description: yup
		.string()
		.max(1000, 'Description cannot exceed 1000 characters.')
		.min(5, 'Description cannot be shorter than 5 characters.')
		.required('Description is required.'),
	category: yup
		.number()
		.max(Object.keys(CategoryTypeEnum).length, 'Category out of bounds.')
		.min(1)
		.required('Category is required'),
	images: yup
		.array()
		.of(yup.object().shape({ id: yup.string(), url: yup.string() }))
		.min(1)
		.required('Images are required'),
	'images[0]': yup.object().test('Thumbnail test', 'Listing must have a thumbnail image.', function () {
		return this.parent && this.parent.images && this.parent.images[0] && !!this.parent.images[0].url;
	}),
});

export { validationSchema };
