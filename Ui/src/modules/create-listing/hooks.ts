import { useField } from 'formik';
import { NextRouter, useRouter } from 'next/router';
import { DropResult, ResponderProvided } from 'react-beautiful-dnd';
import { useMutation } from 'react-query';

import { ImageFormikValue } from '../../pages/create-listing/types';
import { axiosCdnInstance } from '../../utils/axios';
import { UploadImageRequest, UploadImageResponse } from './types';

const useImageUpload = (name: string) => {
	const [field, _, helpers] = useField(name);
	const router: NextRouter = useRouter();

	const { mutate: uploadImageMutation, isLoading: isUploading } = useMutation(
		'uploadImage',
		({ id, formData }: UploadImageRequest) => uploadImage(id, formData),
		{
			onError: (err) => {
				console.error('Uploading image to cdn failed ', err);
				router.push('/500');
			},
		}
	);

	const checkFileSize = (file: File): boolean => {
		if (file.size > 5 * 1000 * 1000) {
			return false;
		}

		return true;
	};

	const createFormData = (file: File): FormData => {
		const formData = new FormData();
		formData.append('file', file, file.name);

		return formData;
	};

	const updateFormikImageValues = (id: string, url: string): void => {
		const newArray: ImageFormikValue[] = [...field.value];
		newArray[newArray.findIndex((image: ImageFormikValue) => image.id === id)].url = url;

		helpers.setValue(newArray, true);
		helpers.setTouched(true);
	};

	const onImageUploaded = async (id: string, file: File | undefined): Promise<void> => {
		if (!file) {
			return;
		}

		if (!checkFileSize(file)) {
			return;
		}

		try {
			uploadImageMutation({ id, formData: createFormData(file) });
		} catch (err) {
			console.error(err);
			router.push('/500');
		}
	};

	const uploadImage = async (id: string, formData: FormData): Promise<any> => {
		try {
			const result = await axiosCdnInstance.post<{ result: UploadImageResponse }>('', formData);
			updateFormikImageValues(id, result.data.result.variants[0]);
		} catch (err) {
			console.error('Uploading image failed', err);
		}
	};

	const onImageDeleted = (id: string): void => updateFormikImageValues(id, '');
	return { isUploading, onImageUploaded, onImageDeleted };
};

const useDragAndDrop = (name: string) => {
	const [field, _, helpers] = useField(name);

	const reorder = (list: ImageFormikValue[], startIndex: number, endIndex: number): ImageFormikValue[] => {
		const result = Array.from(list);
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
