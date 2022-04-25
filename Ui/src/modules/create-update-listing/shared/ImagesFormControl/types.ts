import { FormControl } from '../types';

export type ImagesFormControlProps = FormControl;

export type UploadImageResponse = {
	filename: string;
	id: string;
	requireSignedURLs: boolean;
	uploaded: Date;
	variants: string[];
};

export type UploadImageRequest = {
	id: string;
	formData: FormData;
};
