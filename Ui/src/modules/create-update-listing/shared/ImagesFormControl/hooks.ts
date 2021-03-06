import { useField } from 'formik';
import { NextRouter, useRouter } from 'next/router';
import { DropResult, ResponderProvided } from 'react-beautiful-dnd';
import { useMutation } from 'react-query';
import { axiosCdnInstance } from '@utils/axios';

import { ImageFormikValue } from '../types';
import { UploadImageRequest, UploadImageResponse } from './types';

const useImageUpload = (name: string) => {
	const [field, _, helpers] = useField<ImageFormikValue[]>(name);
	const router: NextRouter = useRouter();

	const { mutate: uploadImageMutate, isLoading: isUploading } = useMutation(
		'uploadImage',
		({ id, formData }: UploadImageRequest) => uploadImage(id, formData),
		{
			onError: (err) => {
				console.error('Uploading image to cdn failed ', err);
				router.replace('/500');
			},
		}
	);

	const hasCorrectFileSize = (file: File): boolean => !(file.size > 5 * 1000 * 1000);

	const createFormData = (file: File): FormData => {
		const formData = new FormData();
		formData.append('file', file, file.name);

		return formData;
	};

	const updateFormikImageValues = (id: string, url: string): void => {
		// deep copy
		const newArray: ImageFormikValue[] = field.value.map((value: ImageFormikValue) => ({ ...value }));
		newArray[newArray.findIndex((image: ImageFormikValue) => image.id === id)].url = url;

		helpers.setValue(newArray, true);
	};

	const onImageUploaded = async (id: string, file: File | undefined): Promise<void> => {
		if (!file) {
			return;
		}

		if (!hasCorrectFileSize(file)) {
			return;
		}

		uploadImageMutate({ id, formData: createFormData(file) });
	};

	const uploadImage = async (id: string, formData: FormData): Promise<void> => {
		const result = await axiosCdnInstance.post<{ result: UploadImageResponse }>('', formData);

		updateFormikImageValues(
			id,
			result.data.result.variants.filter((variant: string) => variant.includes('/public'))[0]
		);
	};

	const onImageDeleted = (id: string): void => updateFormikImageValues(id, '');

	return { isUploading, onImageUploaded, onImageDeleted };
};

const useDragAndDrop = (name: string) => {
	const [field, _, helpers] = useField(name);

	const reorder = (list: ImageFormikValue[], startIndex: number, endIndex: number): ImageFormikValue[] => {
		const result = [...list];
		const [removed] = result.splice(startIndex, 1);
		result.splice(endIndex, 0, removed);

		return result;
	};

	const onDragEnd = (result: DropResult, _: ResponderProvided): void => {
		if (!result.destination) {
			return;
		}

		if (result.destination.index === result.source.index) {
			return;
		}

		const reorderedList: ImageFormikValue[] = reorder(field.value, result.source.index, result.destination.index);

		helpers.setValue(reorderedList, true);
	};

	return { onDragEnd };
};

export { useDragAndDrop, useImageUpload };
