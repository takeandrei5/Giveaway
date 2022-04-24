type FormGroup = { name: string };

export type CategoryFormControlProps = FormGroup;
export type DescriptionFormControlProps = FormGroup;
export type ImagesFormControlProps = FormGroup;
export type TitleFormControlProps = FormGroup;
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
