import { Text } from '@chakra-ui/react';

import { BUTTON, CAPTION, DEFAULT, H1, H2, H3, H5, INPUT, PARAGRAPH, SMALL } from './constants';
import { TypographyProps, TypographyTextStyle, TypographyVariant } from './types';

const Typography = ({
	children,
	variant,
	center = false,
	color = 'inherit',
	prefix = '',
	suffix = '',
	multiline = false,
}: TypographyProps): JSX.Element => {
	const renderTypographyVariant = (variant: TypographyVariant): TypographyTextStyle => {
		switch (variant) {
			case 'h1':
				return H1;
			case 'h2':
				return H2;
			case 'h3':
				return H3;
			case 'h5':
				return H5;
			case 'button':
				return BUTTON;
			case 'input':
				return INPUT;
			case 'paragraph':
				return PARAGRAPH;
			case 'caption':
				return CAPTION;
			case 'small':
				return SMALL;
			default:
				return DEFAULT;
		}
	};

	return (
		<Text
			data-testid='typography'
			as='span'
			color={color}
			textAlign={center ? 'center' : 'initial'}
			whiteSpace={multiline ? 'pre-line' : 'pre'}
			{...renderTypographyVariant(variant)}>
			{prefix}
			{children}
			{suffix}
		</Text>
	);
};

export default Typography;
