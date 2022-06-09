import { useDragAndDrop, useImageUpload } from '@modules/create-update-listing/shared/ImagesFormControl/hooks';
import { renderHook } from '@testing-library/react-hooks';
import { axiosCdnInstance } from '@utils/axios';
import { QueryClientWrapper } from '__tests__/wrappers';
import MockAdapter from 'axios-mock-adapter';
import { useField } from 'formik';
import { useRouter } from 'next/router';
import { DropResult, ResponderProvided } from 'react-beautiful-dnd';
import { ImageFormikValue } from '@modules/create-update-listing/shared/types';

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

jest.mock('next/router', () => ({
	...jest.requireActual('next/router'),
	useRouter: jest.fn(),
}));

describe('useImageUpload', () => {
	const fieldName: string = 'test-name';

	describe('onImageUploaded', () => {
		const id: string = 'test-id';

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

		beforeEach(() => {
			fieldValue = [
				{
					id: 'test-id1',
					url: 'test-url1',
				},
				{
					id: 'test-id2',
					url: 'test-url2',
				},
				{
					id: 'test-id3',
					url: 'test-url3',
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

		it('should return undefined if file is falsy', async () => {
			// Arrange
			const file: File = undefined!;

			// Act
			const { result } = renderHook(() => useImageUpload(fieldName), {
				wrapper: QueryClientWrapper,
			});

			// Assert
			expect(await result.current.onImageUploaded(id, file)).toBeUndefined();
		});

		it('should return undefined if file is larger than 5 * 1000 * 1000 bytes', async () => {
			// Arrange
			const file: File = {
				size: 5000001, // 5MB + 1 byte
			} as File;

			// Act
			const { result } = renderHook(() => useImageUpload(fieldName), {
				wrapper: QueryClientWrapper,
			});

			// Assert
			expect(await result.current.onImageUploaded(id, file)).toBeUndefined();
		});

		describe('uploadImageMutate', () => {
			const mock: MockAdapter = new MockAdapter(axiosCdnInstance);

			afterEach(() => mock.reset());

			it('should redirect to `/500` and call console.error if there is an error ', async () => {
				// Arrange
				let route: string = '';

				(useRouter as unknown as jest.Mock).mockImplementation(() => ({
					route,
					replace: jest.fn((value: string) => (route = value)),
				}));

				mock.onPost().reply(500);

				// Act
				const { result, waitForNextUpdate } = renderHook(() => useImageUpload(fieldName), {
					wrapper: QueryClientWrapper,
				});

				await result.current.onImageUploaded('test-id', new File([], 'test-name'));
				await waitForNextUpdate();

				// Assert

				expect(route).toBe('/500');
			});

			it('should replace the url of the searched id correctly', async () => {
				// Arrange
				const newUrl: string = 'test-variant/public';

				mock.onPost().reply(200, {
					result: {
						variants: [newUrl],
					},
				});

				// Act
				const { result, waitForNextUpdate } = renderHook(() => useImageUpload(fieldName), {
					wrapper: QueryClientWrapper,
				});

				await result.current.onImageUploaded('test-id1', new File([], 'test-name'));
				await waitForNextUpdate();

				// Assert
				expect(fieldValue).toEqual([
					{
						id: 'test-id1',
						url: newUrl,
					},
					{
						id: 'test-id2',
						url: 'test-url2',
					},
					{
						id: 'test-id3',
						url: 'test-url3',
					},
				]);
				expect(setTouchedMock).toHaveBeenCalledWith(true);
				expect(setTouchedMock).toHaveBeenCalledTimes(1);
			});
		});
	});

	describe('onImageDeleted', () => {
		it('should remove the url of the searched id correctly', () => {
			// Arrange
			let fieldValue: ImageFormikValue[] = [
				{
					id: 'test-id1',
					url: 'test-url1',
				},
				{
					id: 'test-id2',
					url: 'test-url2',
				},
				{
					id: 'test-id3',
					url: 'test-url3',
				},
			];

			const idTbs: string = 'test-id1';

			const setValueMock: jest.Mock<void, [value: ImageFormikValue[], shouldValidate?: boolean | undefined]> = jest.fn(
				(value: ImageFormikValue[], shouldValidate?: boolean) => {
					fieldValue = value;
				}
			);

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
					setTouched: jest.fn(),
				},
			]);

			// Act
			const { result } = renderHook(() => useImageUpload(fieldName), { wrapper: QueryClientWrapper });
			result.current.onImageDeleted(idTbs);

			// Assert
			expect(fieldValue).toEqual([
				{
					id: 'test-id1',
					url: '',
				},
				{
					id: 'test-id2',
					url: 'test-url2',
				},
				{
					id: 'test-id3',
					url: 'test-url3',
				},
			]);
		});
	});
});

describe('useDragAndDrop', () => {
	const fieldName: string = 'test-name';
	const responderProvided: ResponderProvided = { announce: jest.fn() };

	let fieldValue: ImageFormikValue[] = [
		{
			id: 'test-id1',
			url: 'test-url1',
		},
		{
			id: 'test-id2',
			url: 'test-url2',
		},
		{
			id: 'test-id3',
			url: 'test-url3',
		},
	];

	const setValueMock: jest.Mock<void, [value: ImageFormikValue[], shouldValidate?: boolean | undefined]> = jest.fn(
		(value: ImageFormikValue[], shouldValidate?: boolean) => {
			fieldValue = value;
		}
	);

	beforeEach(() => {
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
				setTouched: jest.fn(),
			},
		]);
	});

	it('should return undefined if destination is falsy', () => {
		// Arrange
		const dropResult: DropResult = {
			destination: undefined,
		} as DropResult;

		// Act
		const { result } = renderHook(() => useDragAndDrop(fieldName));

		// Assert
		expect(result.current.onDragEnd(dropResult, responderProvided)).toBeUndefined();
	});

	it('should return undefined if dropResult destination index is equal to dropResult source index', () => {
		// Arrange
		const dropResult: DropResult = {
			source: {
				index: 0,
			},
			destination: {
				index: 0,
			},
		} as DropResult;

		// Act
		const { result } = renderHook(() => useDragAndDrop(fieldName));

		// Assert
		expect(result.current.onDragEnd(dropResult, responderProvided)).toBeUndefined();
	});

	it('should call `reorder` and `helper.setValue`', async () => {
		// Arrange
		const reorderedImages: ImageFormikValue[] = [
			{
				id: 'test-id2',
				url: 'test-url2',
			},
			{
				id: 'test-id3',
				url: 'test-url3',
			},
			{
				id: 'test-id1',
				url: 'test-url1',
			},
		];

		const dropResult: DropResult = {
			source: {
				index: 0,
			},
			destination: {
				index: 2,
			},
		} as DropResult;

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
				setTouched: jest.fn(),
			},
		]);

		// Act
		const { result } = renderHook(() => useDragAndDrop(fieldName));
		result.current.onDragEnd(dropResult, responderProvided);

		// Assert
		expect(fieldValue).toEqual(reorderedImages);
	});
});
