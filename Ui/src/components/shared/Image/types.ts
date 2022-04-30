import { ImageProps as NextImageProps } from 'next/image';

export type ImageProps = NextImageProps & {
	height: string;
	width: string;
	backgroundColor?: string;
	borderRadius?: string;
	draggable?: boolean;
};
