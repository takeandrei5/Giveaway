import { ImagesFormControl } from '@modules/create-update-listing/shared/ImagesFormControl';
import { useImageUpload } from '@modules/create-update-listing/shared/ImagesFormControl/hooks';
import { ImagesFormControlProps } from '@modules/create-update-listing/shared/ImagesFormControl/types';
import { ImageFormikValue } from '@modules/create-update-listing/shared/types';
import { fireEvent, render } from '@testing-library/react';
import { useField } from 'formik';
import { TEST_IMAGE } from '__tests__/constants';
import { QueryClientWrapper } from '__tests__/wrappers';

jest.mock('next/config', () => () => ({
	publicRuntimeConfig: {
		apiUrl: 'http://localhost/',
	},
	serverRuntimeConfig: {
		apiUrl: 'http://localhost/',
	},
}));

jest.mock('formik', () => ({
	...jest.requireActual('formik'),
	useField: jest.fn(),
}));

jest.mock('@modules/create-update-listing/shared/ImagesFormControl/hooks', () => ({
	...jest.requireActual('@modules/create-update-listing/shared/ImagesFormControl/hooks'),
	useImageUpload: jest.fn(),
}));

describe('ImagesFormControl', () => {
	let fieldValue: ImageFormikValue[] = [] as ImageFormikValue[];

	const setTouchedMock: jest.Mock<void, [value: boolean, shouldValidate?: boolean | undefined]> = jest.fn<
		void,
		[value: boolean, shouldValidate?: boolean | undefined]
	>();

	const setValueMock: jest.Mock<void, [value: ImageFormikValue[], shouldValidate?: boolean | undefined]> = jest.fn(
		(value: ImageFormikValue[], shouldValidate?: boolean) => {
			fieldValue = value;
		}
	);

	let onImageUploaded: jest.Mock<void, [id: string, file: File | undefined]> = jest.fn<
		void,
		[id: string, file: File | undefined]
	>();
	let onImageDeleted: jest.Mock<void, [id: string]> = jest.fn<void, [id: string]>();
	let isUploading: boolean = false;

	beforeEach(() => {
		fieldValue = [
			{
				id: 'test-id1',
				url: TEST_IMAGE,
			},
			{
				id: 'test-id2',
				url: TEST_IMAGE,
			},
			{
				id: 'test-id3',
				url: TEST_IMAGE,
			},
		];

		(useField as unknown as jest.Mock).mockImplementation(() => [
			{
				value: fieldValue,
			},
			{
				value: fieldValue,
				error: '',
				touched: false,
				initialValue: fieldValue,
				initialTouched: false,
				initialError: '',
			},
			{
				setValue: setValueMock,
				setTouched: setTouchedMock,
			},
		]);
	});

	it('should match snapshot', () => {
		// Arrange
		const props: ImagesFormControlProps = {
			name: 'test-images',
		};

		(useImageUpload as unknown as jest.Mock).mockImplementation(() => ({
			onImageUploaded,
			onImageDeleted,
			isUploading,
		}));

		// Act
		const { container } = render(<ImagesFormControl {...props} />, { wrapper: QueryClientWrapper });

		// Assert
		expect(container).toMatchSnapshot();
	});

	it('should execute onImageDeleted when the delete image button is clicked', () => {
		// Arrange
		const props: ImagesFormControlProps = {
			name: 'test-images',
		};

		(useImageUpload as unknown as jest.Mock).mockImplementation(() => ({
			onImageUploaded,
			onImageDeleted,
			isUploading,
		}));

		// Act
		const { container } = render(<ImagesFormControl {...props} />, { wrapper: QueryClientWrapper });

		fireEvent.click(container.querySelector('#delete-image-button')!);

		// Assert
		expect(onImageDeleted).toBeCalledTimes(1);
	});

	describe('Spinner', () => {
		it('should render a spinner if isUploading is true', () => {
			// Arrange
			const props: ImagesFormControlProps = {
				name: 'test-images',
			};

			isUploading = true;

			(useImageUpload as unknown as jest.Mock).mockImplementation(() => ({
				onImageUploaded,
				onImageDeleted,
				isUploading,
			}));

			// Act
			const { getByTestId } = render(<ImagesFormControl {...props} />, { wrapper: QueryClientWrapper });

			// Assert
			expect(getByTestId('uploading-image-spinner')).toBeTruthy();
		});

		it('should not render a spinner if isUploading is false', () => {
			// Arrange
			const props: ImagesFormControlProps = {
				name: 'test-images',
			};

			isUploading = false;

			(useImageUpload as unknown as jest.Mock).mockImplementation(() => ({
				onImageUploaded,
				onImageDeleted,
				isUploading,
			}));

			// Act
			const { queryByTestId } = render(<ImagesFormControl {...props} />, { wrapper: QueryClientWrapper });

			// Assert
			expect(queryByTestId('uploading-image-spinner')).toBeFalsy();
		});
	});

	describe('File input', () => {
		it('should have pointer events `none` if isUploading is true', () => {
			// Arrange
			const props: ImagesFormControlProps = {
				name: 'test-images',
			};

			isUploading = true;

			(useImageUpload as unknown as jest.Mock).mockImplementation(() => ({
				onImageUploaded,
				onImageDeleted,
				isUploading,
			}));

			// Act
			const { container } = render(<ImagesFormControl {...props} />, { wrapper: QueryClientWrapper });

			// Assert
			const styles: CSSStyleDeclaration = getComputedStyle(container.querySelector('#file-input')!);

			expect(styles).toHaveProperty('pointer-events', 'none');
		});

		it('should have pointer events `none` if isUploading is false', () => {
			// Arrange
			const props: ImagesFormControlProps = {
				name: 'test-images',
			};

			isUploading = false;

			(useImageUpload as unknown as jest.Mock).mockImplementation(() => ({
				onImageUploaded,
				onImageDeleted,
				isUploading,
			}));

			// Act
			const { container } = render(<ImagesFormControl {...props} />, { wrapper: QueryClientWrapper });

			// Assert
			const styles: CSSStyleDeclaration = getComputedStyle(container.querySelector('#file-input')!);

			expect(styles).toHaveProperty('pointer-events', 'auto');
		});
	});
});
