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
				_focus: {
					borderColor: 'primary.main',
					boxShadow: '0 0 0 0.0625rem var(--chakra-colors-primary-main)',
				},
			},
		},
	},
};

export default styles;
