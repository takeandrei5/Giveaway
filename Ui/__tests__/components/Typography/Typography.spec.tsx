import { Typography } from '@components';
import { BUTTON, CAPTION, DEFAULT, H1, H2, H3, H5, INPUT, PARAGRAPH, SMALL } from '@components/Typography/constants';
import { TypographyProps } from '@components/Typography/types';
import { render } from '@testing-library/react';

describe('Typography', () => {
	it('should match snapshot', () => {
		// Arrange
		const props: TypographyProps = {
			children: 'Test-Text',
			variant: 'input',
		};

		// Act
		const { container } = render(<Typography {...props} />);

		// Assert
		expect(container).toMatchSnapshot();
	});

	describe('variant prop', () => {
		it('should render with variant `h1` styles if variant is h1', () => {
			// Arrange
			const props: TypographyProps = {
				children: 'Test-Text',
				variant: 'h1',
			};

			// Act
			const { getByTestId } = render(<Typography {...props} />);

			// Assert
			const styles: CSSStyleDeclaration = getComputedStyle(getByTestId('typography'));
			expect(styles).toHaveProperty('font-size', H1.fontSize);
			expect(styles).toHaveProperty('font-weight', H1.fontWeight);
			expect(styles).toHaveProperty('line-height', H1.lineHeight);
		});

		it('should render with variant `h2` styles if variant is h2', () => {
			// Arrange
			const props: TypographyProps = {
				children: 'Test-Text',
				variant: 'h2',
			};

			// Act
			const { getByTestId } = render(<Typography {...props} />);

			// Assert
			const styles: CSSStyleDeclaration = getComputedStyle(getByTestId('typography'));
			expect(styles).toHaveProperty('font-size', H2.fontSize);
			expect(styles).toHaveProperty('font-weight', H2.fontWeight);
			expect(styles).toHaveProperty('line-height', H2.lineHeight);
		});

		it('should render with variant `h3` styles if variant is h3', () => {
			// Arrange
			const props: TypographyProps = {
				children: 'Test-Text',
				variant: 'h3',
			};

			// Act
			const { getByTestId } = render(<Typography {...props} />);

			// Assert
			const styles: CSSStyleDeclaration = getComputedStyle(getByTestId('typography'));
			expect(styles).toHaveProperty('font-size', H3.fontSize);
			expect(styles).toHaveProperty('font-weight', H3.fontWeight);
			expect(styles).toHaveProperty('line-height', H3.lineHeight);
		});

		it('should render with variant `h5` styles if variant is h5', () => {
			// Arrange
			const props: TypographyProps = {
				children: 'Test-Text',
				variant: 'h5',
			};

			// Act
			const { getByTestId } = render(<Typography {...props} />);

			// Assert
			const styles: CSSStyleDeclaration = getComputedStyle(getByTestId('typography'));
			expect(styles).toHaveProperty('font-size', H5.fontSize);
			expect(styles).toHaveProperty('font-weight', H5.fontWeight);
			expect(styles).toHaveProperty('line-height', H5.lineHeight);
		});

		it('should render with variant `button` styles if variant is button', () => {
			// Arrange
			const props: TypographyProps = {
				children: 'Test-Text',
				variant: 'button',
			};

			// Act
			const { getByTestId } = render(<Typography {...props} />);

			// Assert
			const styles: CSSStyleDeclaration = getComputedStyle(getByTestId('typography'));
			expect(styles).toHaveProperty('font-size', BUTTON.fontSize);
			expect(styles).toHaveProperty('font-weight', BUTTON.fontWeight);
			expect(styles).toHaveProperty('line-height', BUTTON.lineHeight);
		});

		it('should render with variant `input` styles if variant is input', () => {
			// Arrange
			const props: TypographyProps = {
				children: 'Test-Text',
				variant: 'input',
			};

			// Act
			const { getByTestId } = render(<Typography {...props} />);

			// Assert
			const styles: CSSStyleDeclaration = getComputedStyle(getByTestId('typography'));
			expect(styles).toHaveProperty('font-size', INPUT.fontSize);
			expect(styles).toHaveProperty('font-weight', INPUT.fontWeight);
			expect(styles).toHaveProperty('line-height', INPUT.lineHeight);
		});

		it('should render with variant `paragraph` styles if variant is paragraph', () => {
			// Arrange
			const props: TypographyProps = {
				children: 'Test-Text',
				variant: 'paragraph',
			};

			// Act
			const { getByTestId } = render(<Typography {...props} />);

			// Assert
			const styles: CSSStyleDeclaration = getComputedStyle(getByTestId('typography'));
			expect(styles).toHaveProperty('font-size', PARAGRAPH.fontSize);
			expect(styles).toHaveProperty('font-weight', PARAGRAPH.fontWeight);
			expect(styles).toHaveProperty('line-height', PARAGRAPH.lineHeight);
		});

		it('should render with variant `caption` styles if variant is caption', () => {
			// Arrange
			const props: TypographyProps = {
				children: 'Test-Text',
				variant: 'caption',
			};

			// Act
			const { getByTestId } = render(<Typography {...props} />);

			// Assert
			const styles: CSSStyleDeclaration = getComputedStyle(getByTestId('typography'));
			expect(styles).toHaveProperty('font-size', CAPTION.fontSize);
			expect(styles).toHaveProperty('font-weight', CAPTION.fontWeight);
			expect(styles).toHaveProperty('line-height', CAPTION.lineHeight);
		});

		it('should render with variant `small` styles if variant is small', () => {
			// Arrange
			const props: TypographyProps = {
				children: 'Test-Text',
				variant: 'small',
			};

			// Act
			const { getByTestId } = render(<Typography {...props} />);

			// Assert
			const styles: CSSStyleDeclaration = getComputedStyle(getByTestId('typography'));
			expect(styles).toHaveProperty('font-size', SMALL.fontSize);
			expect(styles).toHaveProperty('font-weight', SMALL.fontWeight);
			expect(styles).toHaveProperty('line-height', SMALL.lineHeight);
		});

		it('should render with variant `default` styles if variant is default', () => {
			// Arrange
			const props: TypographyProps = {
				children: 'Test-Text',
				variant: 'default',
			};

			// Act
			const { getByTestId } = render(<Typography {...props} />);

			// Assert
			const styles: CSSStyleDeclaration = getComputedStyle(getByTestId('typography'));
			expect(styles).toHaveProperty('font-size', DEFAULT.fontSize);
			expect(styles).toHaveProperty('font-weight', DEFAULT.fontWeight);
			expect(styles).toHaveProperty('line-height', DEFAULT.lineHeight);
		});
	});

	describe('prefix and suffix', () => {
		it('should contain prefix if prefix is not empty or undefined', () => {
			// Arrange
			const props: TypographyProps = {
				children: 'Test-Text',
				variant: 'input',
				prefix: 'prefix-test',
			};

			// Act
			const { getByTestId } = render(<Typography {...props} />);

			// Assert
			expect(getByTestId('typography').textContent).toBe(`${props.prefix}${props.children}`);
		});

		it('should contain suffix if suffix is not empty or undefined', () => {
			// Arrange
			const props: TypographyProps = {
				children: 'Test-Text',
				variant: 'input',
				suffix: 'suffix-test',
			};

			// Act
			const { getByTestId } = render(<Typography {...props} />);

			// Assert
			expect(getByTestId('typography').textContent).toBe(`${props.children}${props.suffix}`);
		});
	});

	describe('center prop', () => {
		it('should render textAlign with value of `center` if center prop is set to true', () => {
			// Arrange
			const props: TypographyProps = {
				children: 'Test-Text',
				variant: 'input',
				suffix: 'suffix-test',
				center: true,
			};

			// Act
			const { getByTestId } = render(<Typography {...props} />);

			// Assert
			const styles: CSSStyleDeclaration = getComputedStyle(getByTestId('typography'));
			expect(styles).toHaveProperty('textAlign', 'center');
		});

		it('should render textAlign with value of `initial` if center prop is set to false', () => {
			// Arrange
			const props: TypographyProps = {
				children: 'Test-Text',
				variant: 'input',
				suffix: 'suffix-test',
				center: false,
			};

			// Act
			const { getByTestId } = render(<Typography {...props} />);

			// Assert
			const styles: CSSStyleDeclaration = getComputedStyle(getByTestId('typography'));
			expect(styles).toHaveProperty('textAlign', 'initial');
		});
	});

	describe('multiline prop', () => {
		it('should render whiteSpace `pre-line` if multiline prop is set to true', () => {
			// Arrange
			const props: TypographyProps = {
				children: 'Test-Text',
				variant: 'input',
				suffix: 'suffix-test',
				multiline: true,
			};

			// Act
			const { getByTestId } = render(<Typography {...props} />);

			// Assert
			const styles: CSSStyleDeclaration = getComputedStyle(getByTestId('typography'));
			expect(styles).toHaveProperty('whiteSpace', 'pre-line');
		});

		it('should render whiteSpace `pre-line` if multiline prop is set to false', () => {
			// Arrange
			const props: TypographyProps = {
				children: 'Test-Text',
				variant: 'input',
				suffix: 'suffix-test',
				multiline: false,
			};

			// Act
			const { getByTestId } = render(<Typography {...props} />);

			// Assert
			const styles: CSSStyleDeclaration = getComputedStyle(getByTestId('typography'));
			expect(styles).toHaveProperty('whiteSpace', 'pre-line');
		});
	});
});
