export type TypographyProps = {
	children: string;
	variant: TypographyVariant;
	color?: string;
	center?: boolean;
	prefix?: string;
	suffix?: string;
	multiline?: boolean;
};

export type TypographyVariant =
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

export type TypographyTextStyle = {
	fontSize: string;
	fontWeight: string;
	lineHeight: string;
};
