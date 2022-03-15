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
				borderRadius: '3.75rem',
				borderSize: '0',
				_focus: {
					borderSize: '0.0625rem',
					borderColor: 'primary.main',
					boxShadow: 'inset 0 0 0 0.0125rem var(--chakra-colors-primary-main)',
				},
				_hover: {
					borderSize: '0'
				}
			},
		},
	},
};

export default styles;
