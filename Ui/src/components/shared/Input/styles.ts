const styles = {
	baseStyle: {
		field: {
			fontSize: '1rem',
			fontWeight: '700',
			lineHeight: '1.1719rem',
		},
	},
	variants: {
		outline: {
			field: {
				backgroundColor: 'white',
				borderRadius: '2xl',
				borderSize: '0',
				_hover: {
					borderSize: '0',
					borderColor: 'none',
				},
				_focus: {
					borderSize: '0.0625rem',
					borderColor: 'primary.main',
					boxShadow: 'inset 0 0 0 0.0125rem var(--chakra-colors-primary-main)',
				},
			},
		},
	},
};

export default styles;
