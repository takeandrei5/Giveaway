import { TypographI, TypographyTextI, TypographyVariantI } from './interfaces';

import { Text } from '@chakra-ui/react';

const Typography = ({ children, variant }: TypographI): JSX.Element => {
	const renderTypographyProps = (variant: TypographyVariantI) => {
		let textProps: TypographyTextI = {} as TypographyTextI;

		switch (variant) {
			case 'h1':
				textProps = {
					fontSize: '2.25rem',
					fontWeight: '900',
					lineHeight: '2.7rem',
				};
				break;
			case 'h3':
				textProps = {
					fontSize: '1.5rem',
					fontWeight: '700',
					lineHeight: '1.8rem',
				};
				break;
			case 'h5':
				textProps = {
					fontSize: '1.125rem',
					fontWeight: '700',
					lineHeight: '1.3125rem',
				};
				break;
			case 'button':
				textProps = {
					fontSize: '1rem',
					fontWeight: '700',
					lineHeight: '1.2rem',
				};
				break;
			case 'input':
				textProps = {
					fontSize: '1rem',
					fontWeight: '700',
					lineHeight: '1.1719rem',
				};
				break;
			case 'paragraph':
				textProps = {
					fontSize: '0.875rem',
					fontWeight: '700',
					lineHeight: '1.05rem',
				};
				break;
			case 'caption':
				textProps = {
					fontSize: '0.75rem',
					fontWeight: '300',
					lineHeight: '0.9rem',
				};
				break;
			case 'small':
				textProps = {
					fontSize: '0.625rem',
					fontWeight: '300',
					lineHeight: '0.75rem',
				};
				break;

			default:
				textProps = {
					fontSize: '1rem',
					fontWeight: '700',
					lineHeight: '1.2rem',
				};
				break;
		}

		return textProps;
	};

	return <Text {...renderTypographyProps(variant)}>{children}</Text>;
};

export default Typography;
