export interface TypographI {
	children: string;
	variant: TypographyVariantI;
	center?: boolean
}

export type TypographyVariantI =
	| 'h1'
	| 'h3'
	| 'h5'
	| 'default'
	| 'input'
	| 'button'
	| 'paragraph'
	| 'caption'
	| 'small';

	export interface TypographyTextI {
		fontSize: string
		fontWeight: string
		lineHeight: string
	}