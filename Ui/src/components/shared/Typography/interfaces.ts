export interface TypographI {
	children: string;
	variant: TypographyVariantI;
	color?: string;
	center?: boolean;
	prefix?: string;
	sufix?: string;
}

export type TypographyVariantI =
	| 'h1'
	| 'h2'
	| 'h3'
	| 'h5'
	| 'default'
	| 'input'
	| 'button'
	| 'paragraph'
	| 'caption'
	| 'small';

export interface TypographyTextI {
	fontSize: string;
	fontWeight: string;
	lineHeight: string;
}
