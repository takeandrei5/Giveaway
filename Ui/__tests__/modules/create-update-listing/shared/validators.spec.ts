import { validationSchema } from '@modules/create-update-listing/shared/validators';
import { CategoryTypeEnum } from '@utils/enums';
import { ValidationError } from 'yup';
import { ImageFormikValue } from '../../../../src/modules/create-update-listing/shared/types';

describe('create/update listing yup validator', () => {
	describe('title validation tests', () => {
		let titleTestValue: string = '';

		const act = async (titleTestValue: string) =>
			await validationSchema.validateAt('title', {
				title: titleTestValue,
			});

		it('should fail if title is not provided', async () => {
			// Arrange
			titleTestValue = '';

			// Act & Assert
			expect(async () => await act(titleTestValue)).rejects.toThrowError(new ValidationError('Title is required.'));
		});

		it('should fail if title is less than 5 characters', async () => {
			// Arrange
			titleTestValue = '1234';

			// Act & Assert
			expect(async () => await act(titleTestValue)).rejects.toThrowError(
				new ValidationError('Title cannot be shorter than 5 characters.')
			);
		});

		it('should fail if title exceeds than 50 characters', async () => {
			// Arrange
			titleTestValue = Array(51).fill('a').join('');

			// Act & Assert
			expect(async () => await act(titleTestValue)).rejects.toThrowError(
				new ValidationError('Title cannot exceed 50 characters.')
			);
		});
	});

	describe('description validation tests', () => {
		let descriptionTestValue: string = '';

		const act = async (descriptionTestValue: string) =>
			await validationSchema.validateAt('description', {
				description: descriptionTestValue,
			});

		it('should fail if description is not provided', async () => {
			// Arrange
			descriptionTestValue = '';

			// Act & Assert
			expect(async () => await act(descriptionTestValue)).rejects.toThrowError(
				new ValidationError('Description is required.')
			);
		});

		it('should fail if description is less than 5 characters', async () => {
			// Arrange
			descriptionTestValue = '1234';

			// Act & Assert
			expect(async () => await act(descriptionTestValue)).rejects.toThrowError(
				new ValidationError('Description cannot be shorter than 5 characters.')
			);
		});

		it('should fail if description exceeds than 1000 characters', async () => {
			// Arrange
			descriptionTestValue = Array(1001).fill('a').join('');

			// Act & Assert
			expect(async () => await act(descriptionTestValue)).rejects.toThrowError(
				new ValidationError('Description cannot exceed 1000 characters.')
			);
		});
	});

	describe('category validation tests', () => {
		let categoryTestValue: number = 0;

		const act = async (categoryTestValue: number) =>
			await validationSchema.validateAt('category', {
				category: categoryTestValue,
			});

		it('should fail if category is less than 1', async () => {
			// Arrange
			categoryTestValue = 0;

			// Act & Assert
			expect(async () => await act(categoryTestValue)).rejects.toThrowError(
				new ValidationError('Category out of bounds.')
			);
		});

		it('should fail if category exceeds than the number of `CategoryTypeEnum` total values', async () => {
			// Arrange
			categoryTestValue = Object.keys(CategoryTypeEnum).length + 1;

			// Act & Assert
			expect(async () => await act(categoryTestValue)).rejects.toThrowError(
				new ValidationError('Category out of bounds.')
			);
		});
	});

	describe('images validation tests', () => {
		let imagesTestValue: ImageFormikValue[] = [];

		const act = async (imagesTestValue: ImageFormikValue[]) =>
			await validationSchema.validateAt('images', {
				images: imagesTestValue,
			});

		it('should fail if images is less than 1', async () => {
			// Arrange
			imagesTestValue = [];

			// Act & Assert
			expect(async () => await act(imagesTestValue)).rejects.toThrowError(
				new ValidationError('Listing must contain at least an image.')
			);
		});

		it('should fail if images[0] id is falsy', async () => {
			// Arrange
			imagesTestValue = [{ id: '', url: 'test-url' }];

			// Act & Assert
			expect(async () => await act(imagesTestValue)).rejects.toThrowError(
				new ValidationError('Listing must have a thumbnail image.')
			);
		});

		it('should fail if images[0] url is falsy', async () => {
			// Arrange
			imagesTestValue = [{ id: 'test-id', url: '' }];

			// Act & Assert
			expect(async () => await act(imagesTestValue)).rejects.toThrowError(
				new ValidationError('Listing must have a thumbnail image.')
			);
		});
	});
});
